(function(document, browser) {
   let fontLink = document.createElement("link");
   fontLink.rel = "stylesheet";
   fontLink.href = "https://fonts.googleapis.com/css?family=Muli:400,600";
   document.head.appendChild(fontLink);

   let lockIconURL = browser.extension.getURL(
      "node_modules/typicons.font/src/svg/lock-closed-outline.svg"
   );
   let closeIconURL = browser.extension.getURL(
      "node_modules/typicons.font/src/svg/delete.svg"
   );

   let warning = document.createElement("div");
   warning.className = "limit-warning";

   let header = document.createElement("div");
   header.className = "limit-warning__header";

   let headerIcon = document.createElement("img");
   headerIcon.className = "header__icon";
   headerIcon.src = lockIconURL;

   let headerText = document.createElement("h3");
   headerText.className = "header__text";
   headerText.textContent = "Approaching Limit";

   let bodyText = document.createElement("p");
   bodyText.className = "limit-warning__body";
   bodyText.textContent =
      "You have used almost all of your visits to this site for the day.";

   let closeBtn = document.createElement("img");
   closeBtn.className = "header__close";
   closeBtn.src = closeIconURL;
   closeBtn.addEventListener("click", function() {
      warning.remove();
   });

   warning.appendChild(header);
   warning.appendChild(bodyText);

   header.appendChild(closeBtn);
   header.appendChild(headerIcon);
   header.appendChild(headerText);

   document.body.appendChild(warning);
})(document, browser);
