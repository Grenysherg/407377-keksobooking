'use strict';

(function () {
  var timeInField = window.formData.field.timeIn;
  var timeOutField = window.formData.field.timeOut;


  window.globalModulesSynchronizeFields(timeInField, timeOutField, window.data.timeIn.VALUES, window.data.timeOut.VALUES, window.formUtility.setFieldValue);


  window.formTimeArrivalAndDeparture = {};

  window.formTimeArrivalAndDeparture.onTimeInChange = function () {
    window.globalModulesSynchronizeFields(timeInField, timeOutField, window.data.timeIn.VALUES, window.data.timeOut.VALUES, window.formUtility.setFieldValue);
  };

  window.formTimeArrivalAndDeparture.onTimeOutChange = function () {
    window.globalModulesSynchronizeFields(timeOutField, timeInField, window.data.timeOut.VALUES, window.data.timeIn.VALUES, window.formUtility.setFieldValue);
  };
})();
