(function(document, window, browser) {
   // listeners
   document.addEventListener("click", e => {
      const cl = e.target.classList;
      const id = e.target.id;

      if (cl.contains("info__remove")) {
         removeSiteTemplate(e);
      }
      if (id === "add-site__btn") {
         addNewSite(e);
      }
   });

   // storage API calls
   browser.storage.onChanged.addListener((changes, areaName) => {
      const siteChanges = changes[LIMITED_SITES];
      if (siteChanges && siteChanges.newValue && areaName === "local") {
         handleSites(siteChanges.newValue);
      }
   });

   browser.storage.local.get(LIMITED_SITES).then(data => {
      const sites = data[LIMITED_SITES] || [];
      handleSites(sites);
   });

   // helper functions
   function handleSites(sites) {
      const siteList = document.getElementById("site-list");

      while (siteList.firstChild) {
         siteList.removeChild(siteList.firstChild);
      }

      sites.forEach(site => {
         const t = siteTemplate(document, site);
         siteList.appendChild(t);
      });
   }

   function showFormError(text) {
      const errEl = document.getElementById("add-site__error");
      errEl.children[1].textContent = text;
      errEl.style.display = "flex";
   }

   function hideFormError() {
      const errEl = document.getElementById("add-site__error");
      errEl.style.display = "none";
   }

   function parseURL(url) {
      let u, path;
      let patterns = [];

      // construct a URL object
      try {
         u = new URL(url);
      } catch (e) {
         // `url` has no protocol
         u = new URL("http://" + url);
      }

      // add trailing slash
      if (u.pathname[u.pathname.length - 1] !== "/") {
         path = u.pathname + "/";
      } else {
         path = u.pathname + "";
      }

      // check for subdomains; if no subdomain, include `www` pattern
      if (u.hostname.split(".").length <= 2) {
         patterns.push(`*://www.${u.host}${path}*`);
      }

      // add basic pattern
      patterns.push(`*://${u.host}${path}*`);

      return {
         url: `${u.host}${path}`,
         patterns: patterns
      };
   }

   function isURL(url) {
      const re = new RegExp(
         "^(https?:\\/\\/)?" + // protocol
         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
         "(\\:\\d+)?" + // port
         "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
         "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
         "i"
      );
      return re.test(url);
   }

   function siteTemplate(document, site) {
      let t = document.createElement("div");
      t.className = "site-template";

      let iconWrapper = document.createElement("div");
      iconWrapper.className = `site-template__icon-wrapper no-padding`;

      let innerIcon = document.createElement("div");
      innerIcon.className = "icon-wrapper__icon typcn typcn-link-outline";

      let templateURL = document.createElement("span");
      templateURL.className = "site-template__url";
      templateURL.textContent = site.url;

      let templateSpacer = document.createElement("div");
      templateSpacer.className = "site-template__spacer";

      let templateInfo = document.createElement("div");
      templateInfo.className = "site-template__info";

      let infoUsage = document.createElement("span");
      infoUsage.className = "info__usage";
      infoUsage.textContent = `${site.visits}/${site.allowance}`;

      let infoRemove = document.createElement("span");
      infoRemove.className = "typcn typcn-delete info__remove";
      infoRemove.setAttribute("data-site", site.url);

      iconWrapper.appendChild(innerIcon);

      templateInfo.appendChild(infoUsage);
      templateInfo.appendChild(infoRemove);

      t.appendChild(iconWrapper);
      t.appendChild(templateURL);
      t.appendChild(templateSpacer);
      t.appendChild(templateInfo);

      return t;
   }

   function removeSiteTemplate(e) {
      browser.storage.local
         .get(LIMITED_SITES)
         .then(data => {
            const sites = data[LIMITED_SITES] || [];
            const dataSite = e.target.getAttribute("data-site");
            browser.storage.local.set({
               [LIMITED_SITES]: sites.filter(site => site.url !== dataSite)
            });
         })
         .catch(err => {
            console.error(err);
         });
   }

   function addNewSite(e) {
      let allowanceEl = document.getElementById("add-site__allowance");
      let urlEl = document.getElementById("add-site__url");

      const url = urlEl.value;
      const allowance = (function() {
         let val = allowanceEl.value;
         val = Number(val);
         val = Math.floor(val);
         return val;
      })();

      if (isNaN(allowance) || allowance < 0) {
         showFormError("The number of allowed visits must be at least 0.");
         return;
      }

      if (!isURL(url)) {
         showFormError("The site given was invalid.");
         return;
      }

      hideFormError();

      allowanceEl.value = "";
      urlEl.value = "";

      const uData = parseURL(url);

      // FIXME: allows duplicates right now
      browser.storage.local
         .get(LIMITED_SITES)
         .then(data => {
            let sites = data[LIMITED_SITES] || [];
            sites.push({
               allowance,
               url: uData.url,
               patterns: uData.patterns,
               visits: 0
            });
            browser.storage.local.set({
               [LIMITED_SITES]: sites
            });
         })
         .catch(err => {
            console.error(err);
         });
   }
})(document, window, browser);
