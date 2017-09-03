'use strict';

(function () {
  window.synchronizeDomFields = function (domChangedField, domSynchronizedField, changedFieldValues, synchronizedFieldValues, synchronizingFunction) {
    var changedFieldCurrentValueElementIndex = changedFieldValues.indexOf(domChangedField.value);

    synchronizingFunction(domSynchronizedField, synchronizedFieldValues[changedFieldCurrentValueElementIndex]);
  };
})();
