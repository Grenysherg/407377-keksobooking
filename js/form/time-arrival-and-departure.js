'use strict';

(function () {
  var timeInField = window.formData.field.timeIn;
  var timeOutField = window.formData.field.timeOut;


  window.synchronizeDomFields(timeInField, timeOutField, window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, window.formUtility.setFieldValue);


  window.formTimeArrivalAndDeparture = {};

  window.formTimeArrivalAndDeparture.onTimeInChange = function () {
    window.synchronizeDomFields(timeInField, timeOutField, window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, window.formUtility.setFieldValue);
  };

  window.formTimeArrivalAndDeparture.onTimeOutChange = function () {
    window.synchronizeDomFields(timeOutField, timeInField, window.data.advert.timeOut.VALUES, window.data.advert.timeIn.VALUES, window.formUtility.setFieldValue);
  };
})();
