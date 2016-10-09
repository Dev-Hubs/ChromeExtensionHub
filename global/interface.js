/*
Wrapping all your code in one variable is adviced approach so that you dont conflict with global objects
 */
var CRXHUB = {
    TARGETS:{
        DEVTOOL:'devTool',
        BACKGROUND:'background',
        CONTENT:'content',
        INSPECTED_WINDOW:'inspectedWindow'
    },
    _ORIGIN: null,
    _PORT:null,
    initialize:function(override,origin){
     if(!override)
        throw new Error("This script cannot communicate with any other script, pass the override object");
     
     this._ORIGIN = origin;
     Object.assign(this.API,override);
     this.API.listen();
    },

    API:{
        listen:function(){
            throw new Error("recieveMessage is not Implemented, pass it in the override object");
        },
        receiveMessage:function(message){
            throw new Error("recieveMessage is not Implemented, pass it in the override object");
        },
        sendMessage:function(payload){
            throw new Error("sendMessage is not Implemented, pass it in the override object");
        },
        routeMessage:function(target){
            throw new Error("routeMessage is not Implemented, pass it in the override object");
        },
        print:function(target, text){
            throw new Error("routeMessage is not Implemented, pass it in the override object");
        }
    }
}