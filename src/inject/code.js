/*
My name is Code Script, I will be injected into your Inspected Window.
I Can :
1) Access DOM
2) Access Global Javascript Object by injecting me into the page just like any other script
3) Receive orders from Content Script.
*/

console.info('Code.js was Injected Successfully!');
window.postMessage({ type: "FROM_PAGE", text: "I am sending you a message from InspectedWindow!" }, "*");
