'use strict';

(function () {
  window.utility = {};

  window.utility.getHalfInteger = function (integer) {
    return Math.round(integer / 2);
  };

  window.utility.sortArrayInRandomOrder = function (array) {
    var arrayElementNewIndex = null;
    var arrayStoreElement = null;


    for (var i = array.length - 1; i > 0; i--) {
      arrayElementNewIndex = Math.floor(Math.random() * (i + 1));

      arrayStoreElement = array[arrayElementNewIndex];
      array[arrayElementNewIndex] = array[i];
      array[i] = arrayStoreElement;
    }


    return array;
  };

  window.utility.isArrayInOtherArray = function (array, otherArray) {
    var otherArrayElementList = this.turnArrayIntoObject(otherArray);


    for (var i = 0; i < array.length; i++) {
      if (!otherArrayElementList[array[i]]) {
        return false;
      }
    }


    return true;
  };

  window.utility.turnArrayIntoObject = function (array) {
    var object = {};


    array.forEach(function (it) {
      object[it] = true;
    });


    return object;
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
})();
