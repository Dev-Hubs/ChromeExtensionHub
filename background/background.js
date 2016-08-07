/*
My name is Background Script, I act like the 'router on a stick' I administer the communication between other scripts
I Can:
1) forward messages from/to Content and DevTool Scripts

 */
var HEADERS = { REFRESH: 1, RESIZE: 2 };

chrome.runtime.onConnect.addListener(function (port) {

    port.onMessage.addListener(function (message, sender, response) {
        //Request a tab for sending needed information
        chrome.tabs.query({ 'highlighted': true }, function (tabs) {
            // DevTool ---> Content
            if (tabs && false) { //We do not need this anymore.
                chrome.tabs.sendMessage(tabs[0].id, message);
                chrome.tabs.executeScript(null, { file: "background/inject/List.js" }, function (result) {
                    alert(result);
                })
            }
        });

    });


    //Content ---> DevTool
    chrome.extension.onMessage.addListener(function (message, sender) {
        port.postMessage(message);
    });
});