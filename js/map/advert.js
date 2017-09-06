'use strict';

(function () {
  var generatedAdvert = {};

  generatedAdvert.AMOUNT = 8;

  generatedAdvert.avatar = {};
  generatedAdvert.avatar.MIN_NUMBER = 1;

  generatedAdvert.TITLES = [
    'Неуютное бунгало по колено в воде',
    'Уютное бунгало далеко от моря',
    'Маленькая неуютная квартира',
    'Большая уютная квартира',
    'Некрасивый негостеприимный домик',
    'Красивый гостевой домик',
    'Маленький ужасный дворец',
    'Огромный прекрасный дворец'
  ];

  generatedAdvert.room = {};
  generatedAdvert.room.MIN = 1;
  generatedAdvert.room.MAX = 5;

  generatedAdvert.capacity = {};
  generatedAdvert.capacity.MIN = 1;

  generatedAdvert.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var createAdvert = function (avatarNumber, titleString) {
    var advert = {};

    avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;


    advert.author = {};
    advert.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

    advert.location = {};
    advert.location.x = window.utility.createRandomInteger(window.mapData.address.x.MIN, window.mapData.address.x.MAX);
    advert.location.y = window.utility.createRandomInteger(window.mapData.address.y.MIN, window.mapData.address.y.MAX);

    advert.offer = {};
    advert.offer.title = titleString;
    advert.offer.address = window.utility.getLocationString(advert.location.x, advert.location.y);
    advert.offer.price = window.utility.createRandomInteger(window.data.advert.price.MIN, window.data.advert.price.MAX);
    advert.offer.type = window.utility.getArrayRandomElement(Object.keys(window.data.advert.lodgeType));
    advert.offer.rooms = window.utility.createRandomInteger(generatedAdvert.room.MIN, generatedAdvert.room.MAX);
    advert.offer.guests = window.utility.createRandomInteger(generatedAdvert.capacity.MIN, advert.offer.rooms);
    advert.offer.checkin = window.utility.getArrayRandomElement(window.data.advert.timeIn.VALUES);
    advert.offer.checkout = window.utility.getArrayRandomElement(window.data.advert.timeOut.VALUES);
    advert.offer.features = window.utility.getRandomUniqueArray(generatedAdvert.FEATURES);
    advert.offer.description = '';
    advert.offer.photos = [];

    return advert;
  };


  window.mapAdvert = {};

  window.mapAdvert.createArray = function () {
    var adverts = [];
    var titles = window.utility.sortArrayInRandomOrder(generatedAdvert.TITLES);

    for (var i = 0; i < generatedAdvert.AMOUNT; i++) {
      adverts[i] = createAdvert(generatedAdvert.avatar.MIN_NUMBER + i, titles[i]);
    }

    return adverts;
  };
})();
