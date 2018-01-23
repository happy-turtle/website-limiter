(function(browser) {
   function updateReset() {
      browser.storage.local.get([LAST_RESET, LIMITED_SITES]).then(data => {
         const now = new Date();
         const sites = data[LIMITED_SITES] || [];
         let lastReset = data[LAST_RESET];

         if (lastReset) {
            // reset available; check it and update accordingly
            lastReset = new Date(lastReset);

            if (now.getTime() - lastReset.getTime() > 8.64e7) {
               // if its been more than 24 hours since the last reset, reset the
               // number of visits, and update the storage accordingly
               for (let site of sites) {
                  site.visits = 0;
               }

               browser.storage.local.set({
                  [LIMITED_SITES]: sites,
                  [LAST_RESET]: now.toDateString()
               });
            }
         } else {
            // reset unavailable; this is the initial set
            browser.storage.local.set({
               [LAST_RESET]: now.toDateString()
            });
         }
      });
   }

   // check the reset every few minutes (technically only needs to run every 24
   // hours, but I'm not sure how often these background scripts get reset)
   setInterval(updateReset, 60 * 5000);
})(browser);
