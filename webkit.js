/* Mont Black — store nuclear: kill navy panels + blue buttons (gradients included) */
(function () {
  try {
    var BG = "#0B0C10";
    var PANEL = "#12141b";
    var BTN = "#1a1a1a";
    var STYLE_ID = "mont-store-black-v53";

    function css() {
      if (document.getElementById(STYLE_ID)) return;
      var s = document.createElement("style");
      s.id = STYLE_ID;
      s.textContent = [
        /* Full black store nav strip */
        "#store_header,#store_header .content,#store_nav_area,#store_nav_area .store_nav,",
        ".store_nav,.store_nav_bg,#responsive_store_nav_ctn,#responsive_store_nav_overlay,",
        "[data-featuretarget='store-menu-v7'],.StoreMenuLoadingPlaceholder{",
        "background:" + BG + "!important;background-color:" + BG + "!important;",
        "background-image:none!important;box-shadow:none!important;}",
        "#store_nav_area .tab,.store_nav a,#responsive_store_nav_ctn a{",
        "background:transparent!important;color:#c8c8c8!important;}",
        "#store_search,.searchbox,input#store_search,#responsive_store_nav_ctn input{",
        "background:" + PANEL + "!important;background-color:" + PANEL + "!important;",
        "color:#fff!important;box-shadow:none!important;border:1px solid rgba(255,255,255,.08)!important;}",
        /* Search + Cart — charcoal, never Steam blue */
        "#store_search_link,a#store_search_link,#store_search_link span,",
        "a#store_header_cart_btn,#cart_status_data,#cart_link,",
        ".store_header_btn,.store_header_btn_green,.store_header_btn_content,",
        "#responsive_store_nav_ctn button[type=submit],",
        "[class*=SearchButton],[class*=CartButton],[href*='/cart']{",
        "background:" + BTN + "!important;background-color:" + BTN + "!important;",
        "background-image:none!important;box-shadow:none!important;color:#fff!important;",
        "border:1px solid rgba(255,255,255,.08)!important;filter:none!important;}",
        "#store_search_link img{filter:grayscale(1) brightness(1.6)!important;}",
        "html,body,body.v6,#application_root,.home_page_body_ctn,.page_content_ctn,",
        ".responsive_page,#store_main_div,.carousel_container,.maincap,.maincap .info,",
        "#home_maincap_v7,#home_maincap_v7 .info,[class*=MainCapsule],[class*=FeaturedCarousel]{",
        "background:" + BG + "!important;background-color:" + BG + "!important;background-image:none!important;}",
        ".maincap .info img,#home_maincap_v7 img{background:transparent!important;}",
        "[style*='#1b2838'],[style*='#2a475e'],[style*='#1a9fff'],[style*='#66c0f4'],",
        "[style*='rgb(26, 159, 255)'],[style*='rgb(27, 40, 56)']{",
        "background:" + BTN + "!important;background-color:" + BTN + "!important;background-image:none!important;}"
      ].join("");
      (document.head || document.documentElement).appendChild(s);
    }

    function parseRgb(str) {
      if (!str) return null;
      var m = String(str).match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      if (!m) return null;
      return { r: +m[1], g: +m[2], b: +m[3] };
    }

    function isNavyOrSteamBlue(r, g, b) {
      /* classic navy panels */
      if (b >= 40 && b <= 130 && r <= 60 && g <= 90 && b >= r && b >= g - 10) return true;
      /* mid navy / slate blue */
      if (r >= 20 && r <= 70 && g >= 35 && g <= 100 && b >= 55 && b <= 140 && b > r + 8) return true;
      /* bright Steam blue buttons */
      if (r <= 100 && g >= 120 && b >= 200) return true;
      if (r <= 80 && g >= 160 && b >= 220) return true;
      return false;
    }

    function looksBlueGradient(bi) {
      if (!bi || bi === "none") return false;
      if (/#1b2838|#171a21|#2a475e|#16202d|#1a9fff|#66c0f4|#1a2738/i.test(bi)) return true;
      var rgbs = bi.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/gi) || [];
      for (var i = 0; i < rgbs.length; i++) {
        var p = parseRgb(rgbs[i]);
        if (p && isNavyOrSteamBlue(p.r, p.g, p.b)) return true;
      }
      return false;
    }

    function paint(el) {
      if (!el || el.nodeType !== 1) return;
      var tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SVG" || tag === "PATH" || tag === "SOURCE") return;
      if (el.id === STYLE_ID) return;

      var cs;
      try { cs = getComputedStyle(el); } catch (e) { return; }
      if (!cs) return;

      var bi = cs.backgroundImage || "";
      var bg = parseRgb(cs.backgroundColor);
      var hit = false;

      if (bg && isNavyOrSteamBlue(bg.r, bg.g, bg.b)) hit = true;
      if (looksBlueGradient(bi)) hit = true;

      /* Known featured panel hosts — always flatten */
      var cls = el.className && String(el.className) || "";
      if (/\binfo\b|maincap|MainCapsule|FeaturedCarousel|discount_block/i.test(cls) && !/screenshot/i.test(cls)) {
        if (bi !== "none" || (bg && bg.b > bg.r)) hit = true;
      }

      if (hit) {
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("background", BG, "important");
        el.style.setProperty("background-color", BG, "important");
        el.style.setProperty("box-shadow", "none", "important");
      }

      /* Bright blue controls → charcoal */
      if (bg && bg.b >= 200 && bg.g >= 120 && bg.r <= 100) {
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("background", BTN, "important");
        el.style.setProperty("background-color", BTN, "important");
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("filter", "none", "important");
      }
    }

    function sweep(root) {
      var base = root || document.body || document.documentElement;
      if (!base) return;
      paint(base);
      var all = base.querySelectorAll("*");
      var n = Math.min(all.length, 2500);
      for (var i = 0; i < n; i++) paint(all[i]);
    }

    css();

    var passes = 0;
    function tick() {
      sweep(document.body);
      /* Also target maincap info specifically */
      var infos = document.querySelectorAll(
        ".maincap .info, #home_maincap_v7 .info, .carousel_container.maincap .info, [class*=MainCapsule] [class*=Info], [class*=maincap] [class*=info]"
      );
      for (var i = 0; i < infos.length; i++) {
        infos[i].style.setProperty("background-image", "none", "important");
        infos[i].style.setProperty("background", PANEL, "important");
        infos[i].style.setProperty("background-color", PANEL, "important");
        var kids = infos[i].children;
        for (var k = 0; k < kids.length; k++) {
          if (kids[k].tagName === "IMG") continue;
          kids[k].style.setProperty("background-image", "none", "important");
          kids[k].style.setProperty("background-color", "transparent", "important");
        }
      }
      passes++;
      if (passes < 10) setTimeout(tick, 300 + passes * 150);
    }

    if (document.body) tick();
    else document.addEventListener("DOMContentLoaded", tick);

    var t = null;
    new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () { t = null; sweep(document.body); }, 200);
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
  } catch (e) {}
})();
