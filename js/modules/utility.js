'use strict';

(function () {
  var keyCode = {};
  keyCode.ENTER = 13;
  keyCode.ESC = 27;


  window.utility = {};

  window.utility.getHalfInteger = function (integer) {
    return Math.round(integer / 2);
  };

  window.utility.sortArrayInRandomOrder = function (array) {
    var arrayElementNewIndex = null;
    var arrayStoreElement = null;


    array.reverse().forEach(function (it, index) {
      arrayElementNewIndex = Math.floor(Math.random() * (index + 1));

      arrayStoreElement = array[arrayElementNewIndex];
      array[arrayElementNewIndex] = it;
      it = arrayStoreElement;
    });


    return array;
  };

  window.utility.isArrayInOtherArray = function (array, otherArray) {
    return array.every(function (it) {
      return otherArray.indexOf(it) !== -1;
    });
  };

  window.utility.renderImg = function (img) {
    var domImg = document.createElement('img');
    domImg.setAttribute('src', img.src);
    domImg.setAttribute('alt', img.alt);
    domImg.setAttribute('width', img.width);
    domImg.setAttribute('height', img.height);


    return domImg;
  };

  window.utility.showSystemMessage = function (text, stateString) {
    var domSystemMessage = document.querySelector('.system-message');
    var domSystemMessageClose = domSystemMessage.querySelector('.system-message__close');


    var onDomSystemMessageCloseClick = function () {
      domSystemMessage.classList.add('hidden');
      domSystemMessage.classList.remove('system-message--' + stateString);

      domSystemMessageClose.removeEventListener('click', onDomSystemMessageCloseClick);
    };


    domSystemMessage.classList.add('system-message--' + stateString);
    domSystemMessage.classList.remove('hidden');

    domSystemMessage.querySelector('.system-message__text').textContent = text;

    domSystemMessageClose.addEventListener('click', onDomSystemMessageCloseClick);
  };

  window.utility.isEnterPressed = function (evt) {
    return evt.keyCode === keyCode.ENTER;
  };

  window.utility.isEscPressed = function (evt) {
    return evt.keyCode === keyCode.ESC;
  };
})();
