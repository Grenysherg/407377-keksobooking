'use strict';

(function () {
  var sign = {};
  sign.RUBLE = String.fromCharCode(8381);

  var keyCode = {};
  keyCode.ENTER = 13;
  keyCode.ESC = 27;


  window.data = {};

  window.data.getSign = function (signName) {
    return sign[signName];
  };

  window.data.ifEnterPressed = function (evt) {
    return evt.keyCode === keyCode.ENTER;
  };

  window.data.ifEscPressed = function (evt) {
    return evt.keyCode === keyCode.ESC;
  };

  window.data.renderRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.data.getRandomArrayElement = function (array) {
    return array[this.renderRandomInteger(0, array.length - 1)];
  };

  window.data.getRandomObjectKey = function (object) {
    var keys = Object.keys(object);

    return keys[this.renderRandomInteger(0, keys.length - 1)];
  };

  window.data.getRandomUniqueArrayElements = function (array, newLength) {
    var element;
    var uniqueElements = [];
    var store = {};

    newLength = newLength || this.renderRandomInteger(0, array.length - 1);

    for (var i = 0; i < newLength; i++) {
      do {
        element = this.getRandomArrayElement(array);
      } while (store[String(element)]);

      uniqueElements[i] = element;
      store[String(element)] = true;
    }

    return uniqueElements;
  };

  window.data.sortArrayElementsRandomOrder = function (array) {
    var number;
    var store;

    for (var i = array.length - 1; i > 0; i--) {
      number = Math.floor(Math.random() * (i + 1));
      store = array[number];
      array[number] = array[i];
      array[i] = store;
    }

    return array;
  };
})();
