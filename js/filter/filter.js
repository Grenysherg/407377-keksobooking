'use strict';

(function () {
  var domFilterForm = document.querySelector('.tokyo__filters');
  var domFilterTypeSelect = domFilterForm.querySelector('#housing_type');
  var domFilterPriceSelect = domFilterForm.querySelector('#housing_price');
  var domFilterRoomSelect = domFilterForm.querySelector('#housing_room-number');
  var domFilterCapacitySelect = domFilterForm.querySelector('#housing_guests-number');
  var domFilterFeaturesInput = domFilterForm.querySelectorAll('input[type="checkbox"');

  var adverts = [];
  var advertList = {};

  var filter = {};

  filter.type = {};
  filter.type['any'] = function (typeString) {
    return typeString === typeString;
  };
  filter.type['bungalo'] = function (typeString) {
    return typeString === 'bungalo';
  };
  filter.type['flat'] = function (typeString) {
    return typeString === 'flat';
  };
  filter.type['house'] = function (typeString) {
    return typeString === 'house';
  };

  filter.price = {};
  filter.price['any'] = function (priceNumber) {
    return priceNumber === priceNumber;
  };
  filter.price['low'] = function (priceNumber) {
    return priceNumber < 10000;
  };
  filter.price['middle'] = function (priceNumber) {
    return priceNumber >= 10000 && priceNumber <= 50000;
  };
  filter.price['high'] = function (priceNumber) {
    return priceNumber > 50000;
  };

  filter.room = {};
  filter.room['any'] = function (roomAmount) {
    return roomAmount === roomAmount;
  };
  filter.room['1'] = function (roomAmount) {
    return roomAmount === 1;
  };
  filter.room['2'] = function (roomAmount) {
    return roomAmount === 2;
  };
  filter.room['3'] = function (roomAmount) {
    return roomAmount === 3;
  };

  filter.capacity = {};
  filter.capacity['any'] = function (capacityNumber) {
    return capacityNumber === capacityNumber;
  };
  filter.capacity['1'] = function (capacityNumber) {
    return capacityNumber === 1;
  };
  filter.capacity['2'] = function (capacityNumber) {
    return capacityNumber === 2;
  };
  filter.capacity['3'] = function (capacityNumber) {
    return capacityNumber === 3;
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

  var createAdvertList = function () {
    var object = {};


    adverts.forEach(function (it, index) {
      object[String(index)] = it;
    });


    return object;
  };

  var createFilterAdvertList = function (filterAdverts) {
    var object = {};

    for (var key in advertList) {
      if (filterAdverts.indexOf(advertList[key]) !== -1) {
        object[key] = advertList[key];
      }
    }


    return object;
  };

  var filtrateAdverts = function () {
    window.map.update(createFilterAdvertList(adverts.filter(function (it) {
      return filter.type[domFilterTypeSelect.value](it.offer.type)
        && filter.price[domFilterPriceSelect.value](it.offer.price)
        && filter.room[domFilterRoomSelect.value](it.offer.rooms)
        && filter.capacity[domFilterCapacitySelect.value](it.offer.guests)
        && window.utility.isArrayInOtherArray(getFeatures(), it.offer.features);
    })));
  };


  window.backend.load(
      'https://1510.dump.academy/keksobooking/data',
      function (loadAdverts) {
        adverts = loadAdverts;
        advertList = createAdvertList();

        window.mapPin.renderOrdinaryCollection(loadAdverts);

        window.map.update(createFilterAdvertList(window.utility.sortArrayInRandomOrder(loadAdverts).slice(0, 3)));
      },
      function (errorMessage) {
        window.utility.showSystemMessage(errorMessage, 'error');
      }
  );

  domFilterForm.addEventListener('change', function () {
    window.debounce(filtrateAdverts);
  });
})();
