const getCurrentTabInfo = callback => {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  const queryInfo = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(queryInfo, (tabs) => {
    const tab = tabs[0]
    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    if (tab) {
      const url = tab.url;
      const id = tab.id;
      console.assert(typeof url == 'string', 'tab.url should be a string');
      callback(url, id);
    }
  })
}

// 向页面注入JS
function injectCustomJs(jsPath) {
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    console.log('injectCustomJs loaded', this);
    this.parentNode.removeChild(this);
  }
  document.head.appendChild(temp);
}

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
// 解析url search 参数
function resolveUrlSearchParams(url) {
  const searchUrl = url.split('?');
  if (searchUrl.length == 1) {
    return {};
  }
  const searchKVStr = searchUrl[1];
  const params = {};
  searchKVStr.split('&').forEach(item => {
    const kv = item.split('=');
    if (kv.length == 2) {
      params[kv[0]] = kv[1];
    }
  });

  return params;
}
