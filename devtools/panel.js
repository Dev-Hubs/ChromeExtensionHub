/*
My name is DevTool Script, I am the one you see when you press F12
I Can:
1) present a UI to users to help them Interact with the Inspected Window.
*/

if (!CRXHUB)
    alert('scripts are racing');


CRXHUB.initialize({
    listen: function () {
        CRXHUB._PORT = chrome.runtime.connect({
            name: CRXHUB._ORIGIN
        });
        CRXHUB._PORT.onMessage.addListener(CRXHUB.API.receiveMessage);
    },
    receiveMessage: function (message) {
        CRXHUB.customCode.print(message, false);
    },
    sendMessage: function (payload, target = CRXHUB.TARGETS.INSPECTED_WINDOW, origin = CRXHUB._ORIGIN) {
        CRXHUB.customCode.print(message);
        var message = {
            header: {
                target: target,
                origin: origin
            },
            payload: payload
        }
        CRXHUB._PORT.postMessage(message);


    }
}, CRXHUB.TARGETS.DEVTOOL);

CRXHUB.customCode = {
    print: function (message, out = true) {
        if (out) {
            console.info(CRXHUB._ORIGIN, '->', JSON.stringify(message));
            document.querySelector("#devtool .out").textContent = JSON.stringify(message);
        }
        else {
            console.info(CRXHUB._ORIGIN, '<-', JSON.stringify(message));
            document.querySelector("#devtool .in").textContent = JSON.stringify(message);
        }
    }
}



document.querySelectorAll('button').forEach(button=>{
button.onclick=function(){
    CRXHUB.API.sendMessage('hello from devTool', button.getAttribute('data-target') ,'devTool')
}

})