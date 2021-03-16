// on use debug
function onUseDebugExtension() {
  let search = window.location.search;
  if (search.indexOf('useDebug=true') >= 0) {
    return;
  }
  search += search.indexOf('?') >= 0 ?
    /&$/.test(search) ?
      'useDebug=true'
      :
      `&useDebug=true`
    : `?useDebug=true`;
  window.location.search = search;
}

// off use debug
function offUseDebugExtension() {
  let search = window.location.search;
  if (search.indexOf('useDebug=true') < 0) {
    return;
  }
  search = search.replace(/&?useDebug=true/, '').replace(/\?&/, '');
  window.location.search = search;
}

// use debug tool switch
function toggleUseDebugExtension(enable) {
  if (enable) {
    onUseDebugExtension();
  } else {
    offUseDebugExtension();
  }
}

function initUseDebugTool() {
  const search = window.location.search;
  chrome.extension.sendMessage({
    cmd: 'changeUseDebugEnable',
    value: search.indexOf('useDebug=true') >= 0,
  }, function (response) {
    // console.log('[dtool log]recevie msg from bg: ' + response);
  });
}

initUseDebugTool();
