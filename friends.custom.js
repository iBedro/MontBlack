/* Mont Black — Friends */
(function () {
  try {
    document.documentElement.style.colorScheme = "dark";
  } catch (e) {}

  function showOwnName() {
    var root = document.querySelector(".currentUserContainer");
    if (!root) return;
    var name = root.querySelector(".nOdcT-MoOaXGePXLyPe0H, .persona_name, ._2saJTAocZ9TnYXTGvnqUMC");
    if (!name) {
      var holders = root.querySelectorAll(".labelHolder, ._4ZTzGZ5TTgFyfw1DcXLXS");
      for (var i = 0; i < holders.length; i++) {
        var t = (holders[i].textContent || "").trim();
        if (t) {
          name = holders[i];
          break;
        }
      }
    }
    if (!name) return;
    name.style.setProperty("color", "#ffffff", "important");
    name.style.setProperty("opacity", "1", "important");
    name.style.setProperty("visibility", "visible", "important");
    name.style.setProperty("display", "block", "important");
    name.style.setProperty("-webkit-mask", "none", "important");
    name.style.setProperty("mask", "none", "important");
    name.style.setProperty("overflow", "visible", "important");
    name.style.setProperty("font-size", "16px", "important");
    name.style.setProperty("font-weight", "600", "important");
  }

  showOwnName();
  document.addEventListener("DOMContentLoaded", showOwnName);
  setTimeout(showOwnName, 400);
  setTimeout(showOwnName, 1200);
  try {
    var t = null;
    new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () {
        t = null;
        showOwnName();
      }, 200);
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
