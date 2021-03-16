(function() {
  const bg = chrome.extension.getBackgroundPage();

  /**
   * usedebug 工具
   */
  function bindUseDebugToolEvent() {
    /** use debug */
    $("#switchUseDebug").click(function() {
      const checked = $(this).prop("checked");
      bg.changeUseDebugEnable(checked);
      chrome.tabs.executeScript(null, {
        code: `toggleUseDebugExtension(${checked})`,
        allFrames: false
      });
    });
  }
  /**
   * 清除缓存工具
   */
  function bindClearCacheEvent() {
    $("#clearDNSCache").click(function() {
      chrome.tabs.query({
        currentWindow: true,
      }, function(tabs) {
        // 校验是否需要新开窗口，如果不需要，直接 active 指定 tab
        var needCreate = true;
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].url === "chrome://net-internals/#sockets") {
            chrome.tabs.update(tabs[i].id, {
              active: true,
            });
            needCreate = false;
            break;
          }
        }

        if (needCreate) {
          chrome.tabs.create(
            {
              url: "chrome://net-internals/#sockets",
              active: true,
            }
          );
        }
      });
    });

    $("#clearLocalStorage").click(function() {
      chrome.tabs.executeScript(null, {
        code: `localStorage.clear()`,
        allFrames: false
      });
    });
  }
  /**
   * iframe工具
   */
  function bindIframeTool() {
    $('#reloadIframe').click(function() {
      chrome.tabs.executeScript(null, {
        code: `refreshIframeWrapper()`,
        allFrames: false
      });
    })
  }
  /**
   * 自定义 url 参数工具
   */
  function bindSelfDefinedParamEvent() {
    $("#switchSelfDefinedTool").click(function() {
      const checked = $(this).prop("checked");
      bg.changeSelfDefinedTool({
        enable: checked
      });
      chrome.tabs.executeScript(null, {
        code: `toggleSelfDefinedExtension('${checked}','{}')`,
        allFrames: false
      });
    });

    $("#setSelfDefinedParam").click(function() {
      const selfDefinedKey = $("#selfDefinedKey").val() || "";
      const selfDefinedValue = $("#selfDefinedValue").val() || "";
      const checked = $("#switchSelfDefinedTool").prop("checked");
      const params = {
        [selfDefinedKey] : selfDefinedValue
      }

      bg.changeSelfDefinedTool({
        enable: checked,
        params
      });
      chrome.tabs.executeScript(null, {
        code: `onSelfDefinedExtension('${checked}', '${
          selfDefinedKey ? JSON.stringify(params) : "{}"
        }')`,
        allFrames: false
      });
    });

    // 清空
    $("#resetSelfDefinedParam").click(function() {
      const selfDefinedKey = $("#selfDefinedKey").val() || "";
      const selfDefinedValue = $("#selfDefinedValue").val() || "";
      const params = {
        [selfDefinedKey] : selfDefinedValue
      }

      $("#selfDefinedKey").val("");
      $("#selfDefinedValue").val("");
      chrome.tabs.executeScript(null, {
        code: `resetSelfDefinedExtension('${
          selfDefinedKey ? JSON.stringify(params) : "{}"
        }')`,
        allFrames: false
      });
    });
  }

  function bindEvent() {
    bindUseDebugToolEvent();
    bindClearCacheEvent();
    bindSelfDefinedParamEvent();
    bindIframeTool();

    $("#link-to-options").click(function() {
      chrome.runtime.openOptionsPage();
    });
  }

  function initDom() {
    // 根据开关，显示工具，！！！注意这里的 key 需要和 dev tools 保存的key 保持一致 ！！！
    chrome.storage.local.get({ 'hxy-tools-switch': null }, function(result) {
      console.log('hxy-tools-switch', result['hxy-tools-switch']);
      if (result['hxy-tools-switch']) {
        result['hxy-tools-switch'].forEach((row) => {
          if (row.isOn || row.defaultOn) {
            $(`div[key=${row.key}]`).show();
          } else {
            $(`div[key=${row.key}]`).hide();
          }
        });
      }
    });
  }

  function renderVersion() {
    var details = chrome.app.getDetails();
    var html = "version:" + details.version;
    $("#version").html(html);
  }

  $(document).ready(function() {
    renderVersion();
    bindEvent();
    initDom();
  });
})();
