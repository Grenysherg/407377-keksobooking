'use strict';

(function () {
  var titleField = window.formData.field.title;
  var typeField = window.formData.field.type;
  var priceField = window.formData.field.price;
  var roomAmountField = window.formData.field.roomAmount;
  var addressField = window.formData.field.address;
  var timeInField = window.formData.field.timeIn;
  var timeOutField = window.formData.field.timeOut;


  var addValidityEventsForm = function () {
    titleField.addEventListener('input', window.formOfferTitle.onThisInput);
    titleField.addEventListener('invalid', window.formOfferTitle.onThisInvalid);

    typeField.addEventListener('change', window.formLodgeType.onThisChange);

    priceField.addEventListener('invalid', window.formPricePerNight.onThisInvalid);

    roomAmountField.addEventListener('change', window.roomAmountAndCapacity.onRoomAmountChange);

    addressField.addEventListener('invalid', window.formAddress.onThisInvalid);

    timeInField.addEventListener('change', window.formTimeArrivalAndDeparture.onTimeInChange);
    timeOutField.addEventListener('change', window.formTimeArrivalAndDeparture.onTimeOutChange);
  };


  addValidityEventsForm();
})();

