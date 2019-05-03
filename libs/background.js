chrome.runtime.onInstalled.addListener(function() {
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: '.' },
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

    const onMessageListener = function(message, sendResponse) {
      //DEBUGGING
      if(message.type == "log"){
        console.log(message.content);
      }
    };
    chrome.runtime.onMessage.addListener(onMessageListener);
});
