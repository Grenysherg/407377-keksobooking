'use strict';

(function () {
  var typeField = window.formData.field.type;
  var priceField = window.formData.field.price;

  var types = window.formUtility.getTypes();
  var minPrices = window.formUtility.getMinPrices();


  window.formLodgeType = {};

  window.formLodgeType.onThisChange = function () {
    window.synchronizeDomFields(typeField, priceField, types, minPrices, window.formUtility.setFieldMinNumber);
  };
})();
