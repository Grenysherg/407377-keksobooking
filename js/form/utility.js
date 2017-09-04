'use strict';

(function () {
  window.formUtility = {};


  window.formUtility.createOptionDomElement = function (value, text) {
    var domElement = document.createElement('option');
    domElement.setAttribute('value', value);
    domElement.text = text;

    return domElement;
  };


  window.formUtility.setErrorColorField = function (field) {
    field.style.borderColor = 'red';
  };

  window.formUtility.setValidColorField = function (field) {
    field.style.borderColor = 'green';
  };


  window.formUtility.setFieldValue = function (field, value) {
    field.value = value;
  };

  window.formUtility.setFieldMinNumber = function (field, number) {
    field.min = number;
  };


  window.formUtility.getTypes = function () {
    return Object.keys(window.data.advert.lodgeType);
  };

  window.formUtility.getMinPrices = function () {
    var array = [];

    for (var key in window.data.lodgeType) {
      if (window.data.lodgeType.hasOwnProperty(key)) {
        array.push(window.data.lodgeType[key].MIN_PRICE);
      }
    }

    return array;
  };
})();
