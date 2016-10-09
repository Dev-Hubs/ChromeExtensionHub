/*
My name is Code Script, I will be injected into your Inspected Window.
I Can :
1) Access DOM
2) Access Global Javascript Object by injecting me into the page just like any other script
3) Receive messages from Content <- Background <- DevTool.
4) Post Messages to Content -> Background -> DevTool.
*/



CRXHUB.initialize({
    listen: function () {
        window.addEventListener("message", function(event){
            var message = event.data;
            CRXHUB.API.routeMessage(message)
        });
    },
    routeMessage: function (message) {
        if (message && message.header && message.header.target === CRXHUB._ORIGIN)
            CRXHUB.API.receiveMessage(message);
    },
    receiveMessage: function (message) {
        CRXHUB.customCode.print(message,false);

    },
    sendMessage: function (payload, target = CRXHUB.TARGETS.DEVTOOL, origin = CRXHUB._ORIGIN) {
        var message = {
            header: {
                target: target,
                origin: origin
            },
            payload: payload
        }
        window.postMessage(message, "*");
        CRXHUB.customCode.print(message);
    }

}, CRXHUB.TARGETS.INSPECTED_WINDOW);

CRXHUB.customCode = {
    print: function (message,out = true) {
        if (out) {
            console.info(CRXHUB._ORIGIN, '->', JSON.stringify(message));
            document.querySelector("#inspected_window .out").textContent = JSON.stringify(message);
        }
        else {
            console.info(CRXHUB._ORIGIN, '<-', JSON.stringify(message));
            document.querySelector("#inspected_window .in").textContent = JSON.stringify(message);
        }
    }
}

