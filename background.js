/**
 * dont uglify ， or it wont work
 *
 */
let useDebugEnable = false;

/** get set */
/** get tab url user location */
/** use debug */
function changeUseDebugEnable(enable) {
  useDebugEnable = enable;
}

function getUseDebugEnable() {
  return useDebugEnable;
}

// receive message
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'changeUseDebugEnable') {
    useDebugEnable = request.value;
  }

  return true;
});

// to refresh Background Data , if data bind with this tab
function refreshBackgroundData() {
  // do sth
  // 更新 use debug
  if (userLocation.indexOf('useDebug=true') >= 0) {
    useDebugEnable = true;
  }
}

// check extension should run in this tab
const shouldRun = () => {
  let shouldRun = false;
  const matches = chrome.runtime.getManifest().externally_connectable.matches.map(item => {
    return item.replace('*://*.', '').replace('/*', '');
  });
  matches.forEach(item => {
    if (userLocation.indexOf(item) >= 0) {
      shouldRun = true;
    }
  });

  if (!shouldRun) {
    chrome.browserAction.setIcon({path: "/icons/icon-disable16.png"});
  } else {
    chrome.browserAction.setIcon({path: "/icons/icon16.png"});
  }
};

// 用户进行 tab 切换的时候，必须更新 background 存储的信息，否则 background 存储的信息是过时的
chrome.tabs.onActivated.addListener(function (activateInfo) {
  chrome.tabs.query({ active: true }, function (tabs) {
    if (!tabs || !tabs.length) {
      return true;
    }
    userLocation = tabs[0].url;
    refreshBackgroundData();
    shouldRun();
  });
  return true;
});

// 当前tab更新时需要更新背景页信息
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  userLocation = tab.url;

  refreshBackgroundData();
  shouldRun();
  return true;
});