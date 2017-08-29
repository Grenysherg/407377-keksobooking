'use strict';

(function () {
  var sign = {};
  sign.RUBLE = String.fromCharCode(8381);

  var keyCode = {};
  keyCode.ENTER = 13;
  keyCode.ESC = 27;


  window.util = {};

  window.util.getSign = function (signName) {
    return sign[signName];
  };

  window.util.ifEnterPressed = function (evt) {
    return evt.keyCode === keyCode.ENTER;
  };

  window.util.ifEscPressed = function (evt) {
    return evt.keyCode === keyCode.ESC;
  };

  window.util.createRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util.getRandomArrayElement = function (array) {
    return array[this.createRandomInteger(0, array.length - 1)];
  };

  window.util.getRandomObjectKey = function (object) {
    var keys = Object.keys(object);

    return keys[this.createRandomInteger(0, keys.length - 1)];
  };

  window.util.getRandomUniqueArrayElements = function (array, newLength) {
    var element;
    var uniqueElements = [];
    var store = {};

    newLength = newLength || this.createRandomInteger(0, array.length - 1);

    for (var i = 0; i < newLength; i++) {
      do {
        element = this.getRandomArrayElement(array);
      } while (store[String(element)]);

      uniqueElements[i] = element;
      store[String(element)] = true;
    }

    return uniqueElements;
  };

  window.util.sortArrayElementsRandomOrder = function (array) {
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
