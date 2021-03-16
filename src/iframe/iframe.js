function clearWrapIframeClass(dom) {
  dom.removeClass('custom-frame-wrapper');
  dom.parent().removeClass('custom-frame-container');
}

function wrapIframe(dom) {
  const iframeUrl = $(dom).attr('src');
  if(!iframeUrl) {
    return;
  }
  clearWrapIframeClass(dom);
  // 增加二方页面标志
  dom.addClass('custom-frame-wrapper');
  const content = `<div class="custom-frame-info"><a href="${iframeUrl}" title="${iframeUrl}" target="_blank">iframe</div>`;
  dom.parent().addClass('custom-frame-container');
  dom.parent().append(content);
}

function refreshIframeWrapper() {
  // 展示所有外嵌iframe，真正实践场景中可以采用注册制，只有部分 iframe 才增加 wrapper
  const iframe = $('iframe');
  wrapIframe(iframe);
}

// 首次延迟加载，避免内容未渲染出来
setTimeout(function() {
  refreshIframeWrapper();
}, 2000);
