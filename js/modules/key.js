'use strict';

(function () {
  var keyCode = {};
  keyCode.ENTER = 13;
  keyCode.ESC = 27;


  window.key = {};

  window.key.isEnterPressed = function (evt) {
    return evt.keyCode === keyCode.ENTER;
  };

  window.key.isEscPressed = function (evt) {
    return evt.keyCode === keyCode.ESC;
  };
})();
