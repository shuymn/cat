import { MenuId } from "./lib/menu";
import { convert, isValidUrl } from "./lib/two";

// register context menu when installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MenuId.Two,
    title: chrome.i18n.getMessage("menuItemTwo"),
    // make it appear in the context menu only for this URL
    documentUrlPatterns: ["https://twitter.com/*"],
  });
});

// register context menu behavior
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // skip if the context menu clicked was not for this extension
  if (info.menuItemId !== MenuId.Two || tab === undefined) {
    return;
  }

  const { url } = tab;
  // target url is required and must be from Twitter
  if (url === undefined || !isValidUrl(url)) {
    return;
  }

  // create textarea element for copy converted url
  const ta = document.createElement("textarea");
  document.body.appendChild(ta);

  ta.value = convert(url);
  ta.select();
  document.execCommand("copy");

  // delete the element prepared for copying
  document.body.removeChild(ta);
});
