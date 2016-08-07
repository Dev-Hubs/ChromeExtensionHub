/*
My name is Content Script, I am the closest script to your Inspected Window.
I Can :
1) Access the DOM
2) Detect when a page gets refreshed
3) Inject a helper script (inject/greenLantern.js) into the Inspected Window
4) Communicate with Background Script, hence DevTool Script
*/



/*
Inject the code.js && style.css into the inspected Window
*/
var html = document.getElementsByTagName('html')[0];

var script = window.document.createElement('script');
script.src = chrome.extension.getURL('inject/code.js');

var style = window.document.createElement('link');
style.href = chrome.extension.getURL('inject/style.css');
style.rel = "stylesheet";

html.appendChild(script);
html.appendChild(style);


/*
Inspected Window Related functions
 */

//onRefresh
chrome.extension.sendMessage({ header: 'refresh', data: null });



//Listen To messages from inspected window
window.addEventListener("message", function(event) {
  // Window <---> Content

  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("so this is received: " + event.data.text);
    //port.postMessage(event.data.text);
  }
}, false);


/*
Message-Port communication
 */
chrome.runtime.onMessage.addListener(function (message, sender) {
    //Content <---> DevTool
    
    switch (message.header) {
        case 1:

            //chrome.extension.sendMessage({ header: HEADERS.LIST, data: null });
            break;
		case 2:
			//...
            break;
        default:
            break;

    }
});

