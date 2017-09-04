'use strict';

(function () {
  var roomAmountField = window.formData.field.roomAmount;
  var capacityField = window.formData.field.capacity;


  var setCurrentCapacityOptions = function () {
    var roomAmountKeys = Object.keys(window.data.advert.room);
    var fragment = document.createDocumentFragment();

    capacityField.options.length = 0;

    if (roomAmountField.value === roomAmountKeys[roomAmountKeys.length - 1]) {
      fragment.appendChild(window.formUtility.createOptionDomElement('0', window.data.advert.capacity.VALUES[0]));
    } else {
      for (var i = roomAmountKeys.indexOf(roomAmountField.value); i >= 0; i--) {
        fragment.appendChild(window.formUtility.createOptionDomElement(String(i + 1), window.data.advert.capacity.VALUES[i + 1]));
      }
    }

    capacityField.appendChild(fragment);
  };


  setCurrentCapacityOptions();


  window.roomAmountAndCapacity = {};

  window.roomAmountAndCapacity.onRoomAmountChange = function () {
    setCurrentCapacityOptions();
  };
})();
