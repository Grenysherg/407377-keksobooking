'use strict';

(function () {
  var titleField = window.formData.field.title;


  window.formOfferTitle = {};

  window.formOfferTitle.onThisInput = function (evt) {
    var target = evt.target;

    if (target.value.length < window.data.advert.title.MIN_LENGTH) {
      titleField.setCustomValidity('Минимально возможное количество символов: ' + window.data.advert.title.MIN_LENGTH);
      window.formUtility.setErrorColorField(titleField);
    } else {
      titleField.setCustomValidity('');
      window.formUtility.setValidColorField(titleField);
    }
  };

  window.formOfferTitle.onThisInvalid = function () {
    if (!titleField.validity.valid) {
      if (titleField.validity.valueMissing) {
        titleField.setCustomValidity(window.formData.validationMessage.EMPTY_FIELD);
        window.formUtility.setErrorColorField(titleField);
      } else if (titleField.validity.tooLong) {
        titleField.setCustomValidity('Максимально возможное количество символов: ' + window.data.advert.title.MAX_LENGTH);
        window.formUtility.setErrorColorField(titleField);
      }
    } else {
      titleField.setCustomValidity('');
      window.formUtility.setValidColorField(titleField);
    }
  };
})();
