// is used by chrome directly to create panels you want.

var panels = chrome.devtools.panels;


var panel = panels.create(
  "Chrome Extension Hub",
  "32.png",
  "devtools/index.html"
);
