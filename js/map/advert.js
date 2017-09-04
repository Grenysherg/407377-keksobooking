'use strict';

(function () {
  var generatedAdvert = {};

  generatedAdvert.AMOUNT = 8;

  generatedAdvert.avatar = {};
  generatedAdvert.avatar.MIN_NUMBER = 1;

  generatedAdvert.title = {};
  generatedAdvert.title['Неуютное бунгало по колено в воде'] = 'bungalo';
  generatedAdvert.title['Уютное бунгало далеко от моря'] = 'bungalo';
  generatedAdvert.title['Маленькая неуютная квартира'] = 'flat';
  generatedAdvert.title['Большая уютная квартира'] = 'flat';
  generatedAdvert.title['Некрасивый негостеприимный домик'] = 'house';
  generatedAdvert.title['Красивый гостевой домик'] = 'house';
  generatedAdvert.title['Маленький ужасный дворец'] = 'palace';
  generatedAdvert.title['Огромный прекрасный дворец'] = 'palace';

  generatedAdvert.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getCapacity = function (rooms, roomsElementIndex) {
    if (roomsElementIndex === rooms.length - 1) {
      return 0;
    }

    return window.utility.createRandomInteger(1, roomsElementIndex);
  };

  var createAdvert = function (avatarNumber, titleString) {
    var advert = {};

    var lodgeTypeString = generatedAdvert.title[titleString];
    var minPriceNumber = window.data.advert.lodgeType[lodgeTypeString].MIN_PRICE;
    var rooms = Object.keys(window.data.advert.room);
    var roomAmount = window.utility.getArrayRandomElement(rooms);
    var roomsElementIndex = rooms.indexOf(roomAmount);

    avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;


    advert.author = {};
    advert.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

    advert.location = {};
    advert.location.x = window.utility.createRandomInteger(window.mapData.address.x.MIN, window.mapData.address.x.MAX);
    advert.location.y = window.utility.createRandomInteger(window.mapData.address.y.MIN, window.mapData.address.y.MAX);

    advert.offer = {};
    advert.offer.title = titleString;
    advert.offer.address = window.utility.getLocationString(advert.location.x, advert.location.y);
    advert.offer.price = window.utility.createRandomInteger(minPriceNumber, window.data.advert.price.MAX);
    advert.offer.type = lodgeTypeString;
    advert.offer.rooms = roomAmount;
    advert.offer.guests = getCapacity(rooms, roomsElementIndex);
    advert.offer.checkin = window.utility.getArrayRandomElement(window.data.advert.timeIn.VALUES);
    advert.offer.checkout = advert.offer.checkin;
    advert.offer.features = window.utility.getRandomUniqueArray(generatedAdvert.FEATURES);
    advert.offer.description = '';
    advert.offer.photos = [];

    return advert;
  };


  window.mapAdvert = {};

  window.mapAdvert.createArray = function () {
    var adverts = [];

    var titles = window.utility.sortArrayInRandomOrder(Object.keys(generatedAdvert.title));

    for (var i = 0; i < generatedAdvert.AMOUNT; i++) {
      adverts[i] = createAdvert(generatedAdvert.avatar.MIN_NUMBER + i, titles[i]);
    }

    return adverts;
  };
})();
