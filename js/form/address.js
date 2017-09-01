'use strict';

(function () {
  var addressField = window.formData.field.address;


  window.formAddress = {};

  window.formAddress.onThisInvalid = function () {
    if (addressField.validity.valueMissing) {
      addressField.setCustomValidity(window.formData.validationMessage.EMPTY_FIELD);
      window.formUtility.setErrorColorField(addressField);
    } else {
      addressField.setCustomValidity('');
      window.formUtility.setValidColorField(addressField);
    }
  };
})();
