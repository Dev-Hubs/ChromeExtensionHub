/*
My name is DevTool Script, I am the one you see when you press F12
I Can:
1) present a UI to users to help them Interact with the Inspected Window.
*/

var devTool = {
    port:chrome.runtime.connect({
        name:"devtool"
    }),
    initialize:function(){
        this.port.onMessage.addListener(function(msg){
            alert (JSON.stringify(msg));
        })
    }
}

