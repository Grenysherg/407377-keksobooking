'use strict';

(function () {
  var generatedAdvertParameter = {};

  generatedAdvertParameter.AMOUNT = 8;

  generatedAdvertParameter.avatar = {};
  generatedAdvertParameter.avatar.NUMBER_MIN = 1;

  generatedAdvertParameter.locationX = {};
  generatedAdvertParameter.locationX.MIN = 300;
  generatedAdvertParameter.locationX.MAX = 900;

  generatedAdvertParameter.locationY = {};
  generatedAdvertParameter.locationY.MIN = 100;
  generatedAdvertParameter.locationY.MAX = 500;

  generatedAdvertParameter.TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  generatedAdvertParameter.price = {};
  generatedAdvertParameter.price.MIN = 1000;
  generatedAdvertParameter.price.MAX = 1000000;

  generatedAdvertParameter.TYPE = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  generatedAdvertParameter.room = {};
  generatedAdvertParameter.room.MIN = 1;
  generatedAdvertParameter.room.MAX = 5;

  generatedAdvertParameter.guest = {};
  generatedAdvertParameter.guest.MIN = 1;

  generatedAdvertParameter.CHECKIN_TIME = ['12:00', '13:00', '14:00'];

  generatedAdvertParameter.CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

  generatedAdvertParameter.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var createAdvertElement = function (avatarNumber, offerTitle) {
    var advertElement = {};

    advertElement.author = {};
    avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
    advertElement.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

    advertElement.location = {};
    advertElement.location.x = window.util.createRandomInteger(generatedAdvertParameter.locationX.MIN, generatedAdvertParameter.locationX.MAX);
    advertElement.location.y = window.util.createRandomInteger(generatedAdvertParameter.locationY.MIN, generatedAdvertParameter.locationY.MAX);

    advertElement.offer = {};
    advertElement.offer.title = offerTitle;
    advertElement.offer.address = advertElement.location.x + ', ' + advertElement.location.y;
    advertElement.offer.price = window.util.createRandomInteger(generatedAdvertParameter.price.MIN, generatedAdvertParameter.price.MAX);
    advertElement.offer.type = window.util.getRandomObjectKey(generatedAdvertParameter.TYPE);
    advertElement.offer.rooms = window.util.createRandomInteger(generatedAdvertParameter.room.MIN, generatedAdvertParameter.room.MAX);
    advertElement.offer.guests = window.util.createRandomInteger(generatedAdvertParameter.guest.MIN, advertElement.offer.rooms);
    advertElement.offer.checkin = window.util.getRandomArrayElement(generatedAdvertParameter.CHECKIN_TIME);
    advertElement.offer.checkout = window.util.getRandomArrayElement(generatedAdvertParameter.CHECKOUT_TIME);
    advertElement.offer.features = window.util.getRandomUniqueArrayElements(generatedAdvertParameter.FEATURES);
    advertElement.offer.description = '';
    advertElement.offer.photos = [];

    return advertElement;
  };


  window.advert = {};

  window.advert.getType = function () {
    return generatedAdvertParameter.TYPE;
  };

  window.advert.createArray = function () {
    var adverts = [];

    var offerTitles = window.util.sortArrayElementsRandomOrder(generatedAdvertParameter.TITLES.concat());

    for (var i = 0; i < generatedAdvertParameter.AMOUNT; i++) {
      adverts[i] = createAdvertElement(generatedAdvertParameter.avatar.NUMBER_MIN + i, offerTitles[i]);
    }

    return adverts;
  };
})();
