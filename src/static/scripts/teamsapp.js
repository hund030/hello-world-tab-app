(function () {
  "use strict";

  // Call the initialize API first
  microsoftTeams.app.initialize();

  // Check the initial theme user chose and respect it
  microsoftTeams.app.getContext(function (context) {
    if (context && context.theme) {
      setTheme(context.theme);
    }
  });

  // Handle theme changes
  microsoftTeams.app.registerOnThemeChangeHandler(function (theme) {
    setTheme(theme);
  });

  // Set the desired theme
  function setTheme(theme) {
    if (theme) {
      // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
      document.body.className =
        "theme-" + (theme === "default" ? "light" : theme);
    }
  }
})();
