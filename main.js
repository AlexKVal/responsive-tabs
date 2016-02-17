(function() {
  'use strict';

  var tabs = function tabs(options) {
    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);

    var activeIndex = 0;
    var initCalled = false;

    var init = function() {
      if (initCalled) { return; }

      el.classList.remove('no-js');

      // TODO: rewrite this with event delegation to a parent element
      for (var i = 0; i < tabNavigationLinks.length; i++) {
        addOnClickHandler(tabNavigationLinks[i], i);
      }

      initCalled = true;
    };

    var addOnClickHandler = function(link, index) {
      link.addEventListener('click', function(e){
          e.preventDefault();
          showTab(index);
        });
    };

    function activeOn(el) { el.classList.add('is-active') };
    function activeOff(el) { el.classList.remove('is-active') };

    var showTab = function(newIndex) {
      if (
        newIndex === activeIndex ||
        newIndex < 0 ||
        newIndex > tabNavigationLinks.length
      ) { return; }

      activeOff(tabNavigationLinks[activeIndex]);
      activeOn(tabNavigationLinks[newIndex]);

      activeOff(tabContentContainers[activeIndex]);
      activeOn(tabContentContainers[newIndex]);

      activeIndex = newIndex;
    };

    return {
      init: init,
      showTab: showTab
    };
  };

  window.tabs = tabs;
})();