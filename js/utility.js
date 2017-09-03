'use strict';

(function () {
  window.utility = {};


  window.utility.createRandomInteger = function (minInteger, maxInteger) {
    return Math.floor(Math.random() * (maxInteger - minInteger + 1)) + minInteger;
  };

  window.utility.getHalfInteger = function (integer) {
    return Math.round(integer / 2);
  };


  window.utility.getRandomUniqueArray = function (array, newArrayLength) {
    var element = null;
    var uniqueArray = [];
    var existingArrayElement = {};

    newArrayLength = newArrayLength || this.createRandomInteger(0, array.length - 1);

    for (var i = 0; i < newArrayLength; i++) {
      do {
        element = this.getArrayRandomElement(array);
      } while (existingArrayElement[String(element)]);

      uniqueArray[i] = element;
      existingArrayElement[String(element)] = true;
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
})();
