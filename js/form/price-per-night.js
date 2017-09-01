'use strict';

(function () {
  var typeField = window.formData.field.type;
  var priceField = window.formData.field.price;

  var types = window.formUtility.getTypes();
  var minPrices = window.formUtility.getMinPrices();


  window.globalModulesSynchronizeFields(typeField, priceField, types, minPrices, window.formUtility.setFieldMinNumber);


  window.formPricePerNight = {};

  window.formPricePerNight.onThisInvalid = function () {
    var currentMinPrice = Number(priceField.getAttribute('min'));

    if (priceField.validity.valueMissing) {
      priceField.setCustomValidity(window.formData.validationMessage.EMPTY_FIELD);
      window.formUtility.setErrorColorField(priceField);
    } else if (priceField.validity.rangeUnderflow) {
      var currentType = types[minPrices.indexOf(currentMinPrice)];
      var currentTypeValue = window.data.lodgeType[currentType].VALUE;

      priceField.setCustomValidity('Для типа жилья "' + currentTypeValue + '" минимально возможная цена: ' + currentMinPrice);
      window.formUtility.setErrorColorField(priceField);
    } else if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Максимально возможная цена: ' + window.data.price.MAX);
      window.formUtility.setErrorColorField(priceField);
    } else {
      priceField.setCustomValidity('');
      window.formUtility.setValidColorField(priceField);
    }
  };
})();
