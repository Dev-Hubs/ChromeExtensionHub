        function sendToContent(){
            CRXHUB.API.sendMessage('hello from inspectedWindow','content','inspectedWindow')
        }
        function sendToBackground(){
            CRXHUB.API.sendMessage('hello from inspectedWindow','background','inspectedWindow')
        }
        function sendToDevTool(){
            CRXHUB.API.sendMessage('hello from inspectedWindow','devtool','inspectedWindow')
        }