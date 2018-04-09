(function(browser) {
   let s = new Set();
   let i = 0;
   const wrapper = document.querySelector(".splash-body__suggestions");

   while (i < NUM_SUGGESTIONS) {
      const idx = Math.floor(Math.random() * RESOURCES.length);
      if (!s.has(idx)) {
         const suggestion = createSuggestion(RESOURCES[idx]);
         wrapper.append(suggestion);
         s.add(idx);
         i++;
      }
   }

   function getTime(lastReset) {
      let now = new Date();
      let diff =
         86400 - Math.floor((now.getTime() - lastReset.getTime()) / 1000);
      let hrs, mins, secs;

      if (diff < 0) {
         return "The site is now accessible. Enjoy!";
      }

      hrs = Math.floor(diff / 3600).toString();
      diff -= hrs * 3600;

      mins = Math.floor(diff / 60).toString();
      diff -= mins * 60;

      secs = diff.toString();

      const prettify = d => (d.length === 1 ? `0${d}` : d);

      return `${prettify(hrs)}:${prettify(mins)}:${prettify(secs)}`;
   }

   function updateClock(lastReset) {
      let tm = getTime(lastReset);
      document.body.querySelector(".splash-body__clock").textContent = tm;
   }

   function createSuggestion(suggestionURL) {
      let suggestion = document.createElement("a");
      suggestion.className = "suggestion";
      suggestion.href = suggestionURL;
      suggestion.textContent = suggestionURL;
      return suggestion;
   }

   browser.storage.local.get([LAST_RESET]).then(function(data) {
      let lastReset = new Date(data[LAST_RESET]);
      updateClock(lastReset);
      setInterval(() => updateClock(lastReset), 1000);
   });
})(browser);
