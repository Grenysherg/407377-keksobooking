'use strict';

(function () {
  var timeInField = window.formData.field.timeIn;
  var timeOutField = window.formData.field.timeOut;


  window.synchronizeDomFields(timeInField, timeOutField, window.data.timeIn.VALUES, window.data.timeOut.VALUES, window.formUtility.setFieldValue);


  window.formTimeArrivalAndDeparture = {};

  window.formTimeArrivalAndDeparture.onTimeInChange = function () {
    window.synchronizeDomFields(timeInField, timeOutField, window.data.timeIn.VALUES, window.data.timeOut.VALUES, window.formUtility.setFieldValue);
  };

  window.formTimeArrivalAndDeparture.onTimeOutChange = function () {
    window.synchronizeDomFields(timeOutField, timeInField, window.data.timeOut.VALUES, window.data.timeIn.VALUES, window.formUtility.setFieldValue);
  };
})();
