/* Mont Black 5.2.1 — stability + menu click fix */
(function () {
  try {
    var body = document.body;
    if (!body) return;

    var BG = "#0B0C10";
    var CARD = "#12141b";

    function injectOnce(id, css) {
      if (document.getElementById(id)) return;
      var el = document.createElement("style");
      el.id = id;
      el.textContent = css;
      (document.head || document.documentElement).appendChild(el);
    }

    /* Always: ContextMenuPosition above ContextMenuMouseOverlay (1599) */
    injectOnce(
      "mont-menu-stack",
      [
        "._2yAm5LY_eu-Vg_52l0HFlM{z-index:5000!important;pointer-events:auto!important;-webkit-app-region:no-drag!important;}",
        "._3Knd7Am6tTwTTu605YN4IX{z-index:1599!important;pointer-events:auto!important;}",
        ".PP7LM0Ow1K5qkR8WElLpt,._3pofGqV0buiKAfMPEs3_82{",
        "pointer-events:auto!important;-webkit-app-region:no-drag!important;}",
        ".PP7LM0Ow1K5qkR8WElLpt *,._2yAm5LY_eu-Vg_52l0HFlM *,._1n7Wloe5jZ6fSuvV18NNWI,",
        "[role=menuitem]{pointer-events:auto!important;-webkit-app-region:no-drag!important;}"
      ].join("")
    );

    var isMenu =
      body.classList.contains("ContextMenuPopup") ||
      document.documentElement.classList.contains("ContextMenuPopup") ||
      !!body.querySelector(":scope > .popup_block, :scope > .popup_menu, :scope > .popup_body") ||
      /menu$/i.test(document.title || "") ||
      /menu/i.test(window.name || "");

    var isModal =
      body.classList.contains("ModalDialogPopup") ||
      body.classList.contains("FullModalOverlay");

    if (isMenu) {
      injectOnce(
        "mont-menu-stable",
        [
          /* window layer MUST stay transparent — opaque bg blacks out the screen.
             This style only injects in MENU windows, so plain body is safe. */
          "html,body,.popup_block,.popup_block_new,.shadow_content{",
          "background:transparent!important;border:none!important;outline:none!important;box-shadow:none!important;",
          "margin:0!important;padding:0!important;overflow:visible!important;pointer-events:auto!important;-webkit-app-region:no-drag!important;}",
          ".PP7LM0Ow1K5qkR8WElLpt,.popup_body,.popup_menu{",
          "background:" + BG + "!important;pointer-events:auto!important;-webkit-app-region:no-drag!important;",
          "border-radius:14px!important;border:1px solid rgba(255,255,255,.08)!important;padding:6px!important;}",
          ".popup_body .popup_menu{background:transparent!important;border:none!important;box-shadow:none!important;}",
          "._1n7Wloe5jZ6fSuvV18NNWI,[role=menuitem]{",
          "padding:6px 16px!important;pointer-events:auto!important;cursor:pointer!important;",
          "-webkit-app-region:no-drag!important;color:#fff!important;}"
        ].join("")
      );
      return;
    }

    if (isModal) {
      injectOnce(
        "mont-modal-stable",
        [
          "html,body,body.ModalDialogPopup,body.FullModalOverlay{background:transparent!important;}",
          ".FullModalOverlay,.ModalOverlayContent,[class*=\"ModalOverlayBackground\"]{background:transparent!important;}",
          "[class*=\"ModalOverlay\"][class*=\"Background\"]{background:rgba(0,0,0,.4)!important;}",
          /* ModalPosition is a full-window POSITIONING wrapper — painting it created
             a stray black band around/above dialog content. Keep it transparent. */
          ".ModalPosition{background:transparent!important;}",
          ".ModalPosition_Content,.DialogContent,.DialogContentTransition,",
          ".DialogBody,.DialogHeader,.DialogFooter{background:" + CARD + "!important;color:#fff!important;",
          "transform:none!important;filter:none!important;}",
          /* TopBar stays visible (needed to drag popups) but fully transparent */
          "div.ModalPosition_TopBar{background:transparent!important;}",
          "body.ModalDialogPopup ._2yAm5LY_eu-Vg_52l0HFlM{",
          "z-index:5000!important;pointer-events:auto!important;-webkit-app-region:no-drag!important;}",
          "body.ModalDialogPopup ._3Knd7Am6tTwTTu605YN4IX{z-index:1599!important;}",
          "body.ModalDialogPopup .PP7LM0Ow1K5qkR8WElLpt,",
          "body.ModalDialogPopup ._3pofGqV0buiKAfMPEs3_82{",
          "pointer-events:auto!important;-webkit-app-region:no-drag!important;",
          "background:" + BG + "!important;border-radius:14px!important;border:none!important;}",
          "body.ModalDialogPopup ._2yAm5LY_eu-Vg_52l0HFlM *,",
          "body.ModalDialogPopup .PP7LM0Ow1K5qkR8WElLpt *,",
          "body.ModalDialogPopup ._1n7Wloe5jZ6fSuvV18NNWI,",
          "body.ModalDialogPopup [role=menuitem]{",
          "pointer-events:auto!important;-webkit-app-region:no-drag!important;cursor:pointer!important;}"
        ].join("")
      );
    }
  } catch (e) {}
})();
