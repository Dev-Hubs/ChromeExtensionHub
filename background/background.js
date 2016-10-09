/*
My name is Background Script, I act like the 'router on a stick' I administer the communication between other scripts
I Can:
1) forward messages from/to Content and DevTool Scripts
2) communicate to the 'Browser Action', the icon of the extension to the top-right
3) alert but not log to the console
 */

console.warn("However, I cannot log directly into the console.");
console.warn("in settings tab click on background to see my console there");

CRXHUB.initialize({
    listen: function () {
        chrome.runtime.onConnect.addListener(function (port) {
            CRXHUB._PORT = port;
            port.onMessage.addListener(CRXHUB.API.routeMessage);
        });
        chrome.extension.onMessage.addListener(CRXHUB.API.routeMessage);
    },
    routeMessage: function (message) {
        if(message.relay === CRXHUB._ORIGIN)return;//self message
        if (message && message.header) {
            if ((message.header.origin === CRXHUB.TARGETS.INSPECTED_WINDOW || message.header.origin === CRXHUB.TARGETS.CONTENT) && message.header.target === CRXHUB.TARGETS.DEVTOOL) {
                CRXHUB.API.sendMessage(message, CRXHUB.TARGETS.DEVTOOL);
            }
            else if (message.header.origin === CRXHUB.TARGETS.DEVTOOL && (message.header.target === CRXHUB.TARGETS.CONTENT || message.header.target === CRXHUB.TARGETS.INSPECTED_WINDOW)) {
                CRXHUB.API.sendMessage(message, message.header.target);
            }
            else if (message.header.target === CRXHUB._ORIGIN) {
                CRXHUB.API.receiveMessage(message);
            }
            else {
                //something wrong
            }
        }
    },
    receiveMessage: function (message) {
        CRXHUB.IN(message);
    },
    sendMessage: function (message, target) {
        message.relay = CRXHUB._ORIGIN;
        if (target === CRXHUB.TARGETS.DEVTOOL) {
            CRXHUB._PORT.postMessage(message);
        }
        else if (target === CRXHUB.TARGETS.CONTENT || target === CRXHUB.TARGETS.INSPECTED_WINDOW) {
            //Request a tab for sending needed information
            chrome.tabs.query({ 'highlighted': true }, function (tabs) {
                // DevTool ---> Content
                if (tabs) { //We do not need this anymore.
                    chrome.tabs.sendMessage(tabs[0].id, message);
                }
            });
        }
        else {
            //something wrong
        }
    }
}, CRXHUB.TARGETS.BACKGROUND);



CRXHUB.OUT = function(message){
console.info(CRXHUB._ORIGIN,'->',JSON.stringify(message));
}
CRXHUB.IN = function(message){
console.info(CRXHUB._ORIGIN,'<-',JSON.stringify(message));
}