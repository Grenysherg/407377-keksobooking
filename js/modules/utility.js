'use strict';

(function () {
  window.utility = {};


  window.utility.createRandomInteger = function (minInteger, maxInteger) {
    return Math.floor(Math.random() * (maxInteger - minInteger + 1)) + minInteger;
  };

  window.utility.getHalfInteger = function (integer) {
    return Math.round(integer / 2);
  };


  window.utility.getRandomUniqueArray = function (array, uniqueArrayLength) {
    var element = null;
    var uniqueArray = [];
    var uniqueArrayExistingElement = {};

    uniqueArrayLength = uniqueArrayLength || this.createRandomInteger(0, array.length - 1);

    for (var i = 0; i < uniqueArrayLength; i++) {
      do {
        element = this.getArrayRandomElement(array);
      } while (uniqueArrayExistingElement[String(element)]);

      uniqueArray[i] = element;
      uniqueArrayExistingElement[String(element)] = true;
    }

    return uniqueArray;
  };

  window.utility.sortArrayInRandomOrder = function (array) {
    var arrayElementNewIndex;
    var arrayStoreElement;

    for (var i = array.length - 1; i > 0; i--) {
      arrayElementNewIndex = Math.floor(Math.random() * (i + 1));

      arrayStoreElement = array[arrayElementNewIndex];
      array[arrayElementNewIndex] = array[i];
      array[i] = arrayStoreElement;
    }

    return array;
  };

  window.utility.getArrayRandomElement = function (array) {
    var arrayRandomIndex = this.createRandomInteger(0, array.length - 1);

    return array[arrayRandomIndex];
  };


  window.utility.getObjectRandomKey = function (object) {
    var objectKeys = Object.keys(object);
    var arrayRandomIndex = this.createRandomInteger(0, objectKeys.length - 1);

    return objectKeys[arrayRandomIndex];
  };


  window.utility.getLocationString = function (coordinateX, coordinateY) {
    return 'x: ' + coordinateX + ', y: ' + coordinateY;
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

    domSystemMessage.classList.add('system-message--' + stateString);
    domSystemMessage.classList.remove('hidden');
    domSystemMessage.querySelector('.system-message__text').textContent = text;


    var onSystemMessageCloseClick = function () {
      domSystemMessage.classList.add('hidden');
      domSystemMessage.classList.remove('system-message--' + stateString);

      domSystemMessageClose.removeEventListener('click', onSystemMessageCloseClick);
    };

    domSystemMessageClose.addEventListener('click', onSystemMessageCloseClick);
  };
})();
