'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var currentTimeoutNumber = null;


  window.debounce = function (cb) {
    if (currentTimeoutNumber) {
      window.clearTimeout(currentTimeoutNumber);
    }

    currentTimeoutNumber = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
