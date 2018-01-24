(function(browser) {
   let sites = [];
   let injections = {};

   // browser storage actions
   browser.storage.local
      .get([LIMITED_SITES])
      .then(data => {
         // start monitoring requests that match sites in the list of limited
         // sites
         sites = data[LIMITED_SITES] || [];
         updateonBeforeRequestListeners();
      })
      .catch(err => {
         console.log("(WL) An error occurred:", err);
      });

   browser.storage.onChanged.addListener((changes, areaName) => {
      // if the list of sites in storage changes, be sure to update the requests
      // being monitored
      const siteChanges = changes[LIMITED_SITES] || {};
      const newSites = siteChanges.newValue;
      if (newSites && areaName === "local") {
         sites = newSites;
         updateonBeforeRequestListeners();
      }
   });

   // helper functions
   function onBeforeRequestListener(details) {
      const matchingSite = (function() {
         for (let site of sites) {
            for (let pattern of site.patterns) {
               const re = matchPatternToRegExp(pattern);
               if (re.test(details.url) && re.test(details.originUrl)) {
                  return null;
               } else if (re.test(details.url)) {
                  return site;
               }
            }
         }
      })();

      if (!matchingSite) {
         // the origin was on the same domain; still the same visit
         return null;
      }

      if (matchingSite.visits === matchingSite.allowance) {
         const redirectURL = browser.extension.getURL("/src/views/splash.html");
         return {
            redirectUrl: redirectURL // blocking response object
         };
      } else {
         matchingSite.visits += 1;
         browser.storage.local.set({
            [LIMITED_SITES]: [
               matchingSite,
               ...sites.filter(site => site.url !== matchingSite.url)
            ]
         });
      }

      if (matchingSite.allowance - matchingSite.visits <= 3) {
         // queue up an injection to be made upon request completion
         injections[details.requestId] = {
            tabId: details.tabId,
            scriptDetails: [
               {
                  file: "/src/content/limit-warning.js"
               }
            ],
            cssDetails: [
               {
                  file: "/src/styles/warning.css",
                  cssOrigin: "user"
               }
            ]
         };
      }
   }

   function onCompletedListener(details) {
      if (injections[details.requestId]) {
         // perform script/CSS injection if needed
         const injection = injections[details.requestId];

         for (let scriptInjection of injection.scriptDetails) {
            browser.tabs.executeScript(injection.tabId, scriptInjection);
         }

         for (let cssInjection of injection.cssDetails) {
            browser.tabs.insertCSS(injection.tabId, cssInjection);
         }
      }
   }

   function updateonBeforeRequestListeners() {
      if (
         browser.webRequest.onBeforeRequest.hasListener(onBeforeRequestListener)
      ) {
         browser.webRequest.onBeforeRequest.removeListener(
            onBeforeRequestListener
         );
      }

      if (browser.webRequest.onCompleted.hasListener(onCompletedListener)) {
         browser.webRequest.onCompleted.removeListener(onCompletedListener);
      }

      if (!sites.length) {
         // no listener is needed if there are no sites to monitor
         return;
      }

      const requestFilter = {
         urls: sites.reduce((x, y) => [...x, ...y.patterns], []),
         types: ["main_frame"]
      };

      browser.webRequest.onBeforeRequest.addListener(
         onBeforeRequestListener,
         requestFilter,
         ["blocking"]
      );

      browser.webRequest.onCompleted.addListener(
         onCompletedListener,
         requestFilter
      );
   }
})(browser);
