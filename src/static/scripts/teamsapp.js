(function () {
  "use strict";

  // Call the initialize API first
  microsoftTeams.app.initialize();

  // Check the initial theme user chose and respect it
  microsoftTeams.app.getContext().then(function (context) {
    if (context && context.theme) {
      setTheme(context.theme);
    }
    if (context?.app?.host?.name) {
      updateHubName(context.app.host.name);
    }
  });

  // Handle theme changes
  microsoftTeams.app.registerOnThemeChangeHandler(function (theme) {
    setTheme(theme);
  });

  // Set the desired theme
  function setTheme(theme) {
    if (theme) {
      console.log(theme);
      // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
      document.body.className =
        "theme-" + (theme === "default" ? "light" : theme);
    }
  }

  function updateHubName(hubName) {
    if (hubName) {
      document.getElementById("hubName").innerHTML = hubName;
    }
  }
})();
