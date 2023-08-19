
//收到清除cookie消息后清除cookie
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    //清除cookie
    chrome.cookies.getAll({ domain: 'wyndhamhotels.com' }, function (cookies) {
        for (var i in cookies) {
            console.log(cookies[i].name);
            chrome.cookies.remove({ url: "https://www.wyndhamhotels.com" + cookies[i].path, name: cookies[i].name });
        }
        //清除所有缓存
        chrome.browsingData.remove({}, {});
    });

});