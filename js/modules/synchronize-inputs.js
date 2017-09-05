'use strict';

(function () {
  window.synchronizeInputs = function (changedInput, synchronizedInput, changedInputValues, synchronizedInputValues, synchronizingFunction) {
    var changedInputValuesElementIndex = changedInputValues.indexOf(changedInput.value);

    synchronizingFunction(synchronizedInput, synchronizedInputValues[changedInputValuesElementIndex]);
  };
})();
