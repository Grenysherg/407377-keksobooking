'use strict';

(function () {
  window.globalModulesSynchronizeFields = function (changedField, synchronizedField, changedFieldValues, synchronizedFieldValues, synchronizationFunction) {
    var changedFieldCurrentValueElementIndex = changedFieldValues.indexOf(changedField.value);

    synchronizationFunction(synchronizedField, synchronizedFieldValues[changedFieldCurrentValueElementIndex]);
  };
})();
