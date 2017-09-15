'use strict';

(function () {
  var INITIAL_ADVERT_LENGTH = 3;

  var ANY_VALUE = 'any';

  var filter = {};

  filter.price = {};
  filter.price.MIN = 10000;
  filter.price.MAX = 50000;

  filter.price.value = {};
  filter.price.value.LOW = 'low';
  filter.price.value.MIDDLE = 'middle';
  filter.price.value.HIGH = 'high';

  var adverts = [];
  var advertStore = {};

  var domFilterForm = document.querySelector('.tokyo__filters');
  var domFilterTypeSelect = domFilterForm.querySelector('#housing_type');
  var domFilterPriceSelect = domFilterForm.querySelector('#housing_price');
  var domFilterRoomSelect = domFilterForm.querySelector('#housing_room-number');
  var domFilterCapacitySelect = domFilterForm.querySelector('#housing_guests-number');
  var domFilterFeaturesInput = domFilterForm.querySelectorAll('input[type="checkbox"]');


  var isAdvertHaveRightParameter = function (advertParameterValue, rightParameterValue) {
    if (rightParameterValue !== ANY_VALUE) {
      return String(advertParameterValue) === rightParameterValue;
    }


    return true;
  };

  var isAdvertHaveRightPrice = function (priceNumber, filterPriceValue) {
    switch (filterPriceValue) {
      case ANY_VALUE:
        return true;
      case filter.price.value.LOW:
        return priceNumber < filter.price.MIN;
      case filter.price.value.MIDDLE:
        return priceNumber >= filter.price.MIN && priceNumber <= filter.price.MAX;
      case filter.price.value.HIGH:
        return priceNumber > filter.price.MAX;
    }


    return false;
  };

  var getFeatures = function () {
    return Array.from(domFilterFeaturesInput).filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });
  };

  var createAdvertStore = function () {
    var object = {};


    adverts.forEach(function (it, index) {
      object[String(index)] = it;
    });


    return object;
  };

  var createFilterAdvertStore = function (filterAdverts) {
    var object = {};


    for (var key in advertStore) {
      if (filterAdverts.indexOf(advertStore[key]) !== -1) {
        object[key] = advertStore[key];
      }
    }


    return object;
  };

  var filtrateAdverts = function () {
    return adverts.filter(function (it) {
      return isAdvertHaveRightParameter(it.offer.type, domFilterTypeSelect.value)
        && isAdvertHaveRightPrice(it.offer.price, domFilterPriceSelect.value)
        && isAdvertHaveRightParameter(it.offer.rooms, domFilterRoomSelect.value)
        && isAdvertHaveRightParameter(it.offer.guests, domFilterCapacitySelect.value)
        && window.utility.isArrayInOtherArray(getFeatures(), it.offer.features);
    });
  };

  var changeFilter = function () {
    window.map.update(createFilterAdvertStore(filtrateAdverts()));
  };


  window.backend.load(
      'https://1510.dump.academy/keksobooking/data',
      function (loadAdverts) {
        adverts = loadAdverts.concat();
        advertStore = createAdvertStore();

        window.pin.renderOrdinaryCollection(loadAdverts);

        window.map.update(createFilterAdvertStore(window.utility.sortArrayInRandomOrder(loadAdverts).slice(0, INITIAL_ADVERT_LENGTH)));
      },
      function (errorMessage) {
        window.utility.showSystemMessage(errorMessage, 'error');
      }
  );

  domFilterForm.addEventListener('change', function () {
    window.debounce(changeFilter);
  });
})();
