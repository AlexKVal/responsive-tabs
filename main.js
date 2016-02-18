(function() {
  'use strict';

  var tabs = function tabs(options) {
    var el = document.querySelector(options.el);
    var activeTab = options.activeTab;

    var initCalled = false;
    var init = function() {
      if (initCalled) return;
      el.classList.remove('no-js');
      hookupOnClickListener(el);
      initCalled = true;
    };

    var hookupOnClickListener = function(el) {
      el.onclick = function(event) {
        // IE doesn't pass in the event object
        event = event || window.event;
        // IE uses srcElement as the target
        var eTarget = event.target || event.srcElement;

        // traversal
        while (eTarget !== el) {
          if (eTarget.tagName === 'A') {
            var href = eTarget.getAttribute('href');
            var tabTarget = (href.charAt(0) === '#') && href;

            if (tabTarget) {
              showTab(tabTarget);
              return;
            }
          }
          eTarget = eTarget.parentNode;
        }
      };
    };

    function activeOn(el) { el.classList.add('is-active') };
    function activeOff(el) { el.classList.remove('is-active') };

    var showTab = function(tabId) {
      var tabToShow = document.querySelector(tabId);

      if (! tabToShow || tabToShow === activeTab) return;

      activeOff(document.querySelector('a.is-active'));
      activeOn(document.querySelector('a[href="'+tabId+'"]'));

      activeOff(activeTab);
      activeOn(tabToShow);

      activeTab = tabToShow;
    };

    return {
      init: init,
      showTab: showTab
    };
  };

  window.tabs = tabs;
})();