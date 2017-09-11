'use strict';

(function () {
  window.synchronizeDomFields = function (domChangedField, domSynchronizedField,
      changedFieldValues, synchronizedFieldValues, cb) {
    cb(domSynchronizedField, synchronizedFieldValues[changedFieldValues.indexOf(domChangedField.value)]);
  };
})();
