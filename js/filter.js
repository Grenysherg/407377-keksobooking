'use strict';

(function () {
  var INITIAL_ADVERT_LENGTH = 3;

  var domFilterForm = document.querySelector('.tokyo__filters');
  var domFilterTypeSelect = domFilterForm.querySelector('#housing_type');
  var domFilterPriceSelect = domFilterForm.querySelector('#housing_price');
  var domFilterRoomSelect = domFilterForm.querySelector('#housing_room-number');
  var domFilterCapacitySelect = domFilterForm.querySelector('#housing_guests-number');
  var domFilterFeaturesInput = domFilterForm.querySelectorAll('input[type="checkbox"]');

  var adverts = [];
  var advertStore = {};

  var filter = {};

  filter.type = {};
  filter.type['bungalo'] = 'bungalo';
  filter.type['flat'] = 'flat';
  filter.type['house'] = 'house';

  filter.price = {};
  filter.price.MIN = 10000;
  filter.price.MAX = 50000;

  filter.room = {};
  filter.room['1'] = 1;
  filter.room['2'] = 2;
  filter.room['3'] = 3;

  filter.capacity = {};
  filter.capacity['1'] = 1;
  filter.capacity['2'] = 2;
  filter.capacity['3'] = 3;


  var filtrateByType = function (typeString, filterTypeValue) {
    switch (filterTypeValue) {
      case 'any':
        return true;
      case 'bungalo':
        return typeString === filter.type['bungalo'];
      case 'flat':
        return typeString === filter.type['flat'];
      case 'house':
        return typeString === filter.type['house'];
    }

    return false;
  };

  var filtrateByPrice = function (priceNumber, filterPriceValue) {
    switch (filterPriceValue) {
      case 'any':
        return true;
      case 'low':
        return priceNumber < filter.price.MIN;
      case 'middle':
        return priceNumber >= filter.price.MIN && priceNumber <= filter.price.MAX;
      case 'high':
        return priceNumber > filter.price.MAX;
    }

    return false;
  };

  var filtrateByRoom = function (roomAmount, filterRoomValue) {
    switch (filterRoomValue) {
      case 'any':
        return true;
      case '1':
        return roomAmount === filter.room['1'];
      case '2':
        return roomAmount === filter.room['2'];
      case '3':
        return roomAmount === filter.room['3'];
    }

    return false;
  };

  var filtrateByCapacity = function (capacityNumber, filterCapacityValue) {
    switch (filterCapacityValue) {
      case 'any':
        return true;
      case '1':
        return capacityNumber === filter.capacity['1'];
      case '2':
        return capacityNumber === filter.capacity['2'];
      case '3':
        return capacityNumber === filter.capacity['3'];
    }

    return false;
  };

  var getFeatures = function () {
    return Array.from(domFilterFeaturesInput)
      .filter(function (it) {
        return it.checked;
      })
      .map(function (it) {
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
    window.map.update(createFilterAdvertStore(adverts.filter(function (it) {
      return filtrateByType(it.offer.type, domFilterTypeSelect.value)
        && filtrateByPrice(it.offer.price, domFilterPriceSelect.value)
        && filtrateByRoom(it.offer.rooms, domFilterRoomSelect.value)
        && filtrateByCapacity(it.offer.guests, domFilterCapacitySelect.value)
        && window.utility.isArrayInOtherArray(getFeatures(), it.offer.features);
    })));
  };


  window.backend.load(
      'https://1510.dump.academy/keksobooking/data',
      function (loadAdverts) {
        adverts = loadAdverts;
        advertStore = createAdvertStore();

        window.pin.renderOrdinaryCollection(loadAdverts);

        window.map.update(createFilterAdvertStore(window.utility.sortArrayInRandomOrder(loadAdverts).slice(0, INITIAL_ADVERT_LENGTH)));
      },
      function (errorMessage) {
        window.utility.showSystemMessage(errorMessage, 'error');
      }
  );

  domFilterForm.addEventListener('change', function () {
    window.debounce(filtrateAdverts);
  });
})();
