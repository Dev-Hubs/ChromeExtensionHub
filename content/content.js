/*
My name is Content Script, I am the closest script to your Inspected Window.
I Can :
1) Access the DOM, log in console, and alert
2) Detect when a page gets refreshed
3) Inject a helper script (inject/code.js) into the Inspected Window
4) communicate in middle between background and injected script (Inspected Window)
*/


/*
Inject the code.js && style.css into the inspected Window
*/
var html = document.getElementsByTagName('html')[0];

var script_interface = window.document.createElement('script');
script_interface.src = chrome.extension.getURL('global/interface.js');

var script_code = window.document.createElement('script');
script_code.src = chrome.extension.getURL('inject/code.js');

var style = window.document.createElement('link');
style.href = chrome.extension.getURL('inject/style.css');
style.rel = "stylesheet";

html.appendChild(script_interface);

html.appendChild(style);
html.appendChild(script_code);

/*
Inspected Window Related functions
 */
console.info("Refresh")

CRXHUB.initialize({
    listen: function () {
        chrome.runtime.onMessage.addListener(CRXHUB.API.routeMessage)

        window.addEventListener("message", function (event) {
            var message = event.data;
            CRXHUB.API.routeMessage(message);
        });
    },
    routeMessage: function (message) {
        if(message.relay === CRXHUB._ORIGIN)return;//self message
        if (message && message.header) {
            if ((message.header.origin === CRXHUB.TARGETS.BACKGROUND || message.header.origin === CRXHUB.TARGETS.DEVTOOL) && message.header.target === CRXHUB.TARGETS.INSPECTED_WINDOW) {
                CRXHUB.API.sendMessage(message, CRXHUB.TARGETS.INSPECTED_WINDOW);
            }
            else if (message.header.origin === CRXHUB.TARGETS.INSPECTED_WINDOW && (message.header.target === CRXHUB.TARGETS.BACKGROUND || message.header.target === CRXHUB.TARGETS.DEVTOOL)) {
                CRXHUB.API.sendMessage(message, CRXHUB.TARGETS.BACKGROUND);
            }
            else if (message.header.target === CRXHUB._ORIGIN ) {
                CRXHUB.API.receiveMessage(message);
            }
            else {
                //something wrong
            }
        }
    },
    receiveMessage:function(message){
        CRXHUB.customCode.print(message,false);
    },
    sendMessage: function (message, target) {
        message.relay=CRXHUB._ORIGIN;
        CRXHUB.customCode.print(message);
        if (target === CRXHUB.TARGETS.BACKGROUND) {
            chrome.extension.sendMessage(message);
        }
        else if (target === CRXHUB.TARGETS.INSPECTED_WINDOW) {
            window.postMessage(message, '*');
        }
        else {
            //something wrong
        }
    }
}, CRXHUB.TARGETS.CONTENT);




CRXHUB.customCode = {
    print: function (message,out=true) {
        if (out) {
            console.info(CRXHUB._ORIGIN, '->', JSON.stringify(message));
            document.querySelector("#content_script .out").textContent = JSON.stringify(message);
        }
        else {
            console.info(CRXHUB._ORIGIN, '<-', JSON.stringify(message));
            document.querySelector("#content_script .in").textContent = JSON.stringify(message);
        }
    }
}