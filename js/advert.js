'use strict';

(function () {
  var generatedAdvertParameter = {};

  generatedAdvertParameter.AMOUNT = 8;

  generatedAdvertParameter.avatar = {};
  generatedAdvertParameter.avatar.NUMBER_MIN = 1;

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


  var createAdvertElement = function (avatarNumber, offerTitle, address) {
    var advertElement = {};

    advertElement.author = {};
    avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
    advertElement.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

    advertElement.location = {};
    advertElement.location.x = window.utility.createRandomInteger(address.x.MIN, address.x.MAX);
    advertElement.location.y = window.utility.createRandomInteger(address.y.MIN, address.y.MAX);

    advertElement.offer = {};
    advertElement.offer.title = offerTitle;
    advertElement.offer.address = advertElement.location.x + ', ' + advertElement.location.y;
    advertElement.offer.price = window.utility.createRandomInteger(generatedAdvertParameter.price.MIN, generatedAdvertParameter.price.MAX);
    advertElement.offer.type = window.utility.getObjectRandomKey(generatedAdvertParameter.TYPE);
    advertElement.offer.rooms = window.utility.createRandomInteger(generatedAdvertParameter.room.MIN, generatedAdvertParameter.room.MAX);
    advertElement.offer.guests = window.utility.createRandomInteger(generatedAdvertParameter.guest.MIN, advertElement.offer.rooms);
    advertElement.offer.checkin = window.utility.getArrayRandomElement(generatedAdvertParameter.CHECKIN_TIME);
    advertElement.offer.checkout = window.utility.getArrayRandomElement(generatedAdvertParameter.CHECKOUT_TIME);
    advertElement.offer.features = window.utility.getRandomUniqueArray(generatedAdvertParameter.FEATURES);
    advertElement.offer.description = '';
    advertElement.offer.photos = [];

    return advertElement;
  };


  window.advert = {};

  window.advert.getType = function () {
    return generatedAdvertParameter.TYPE;
  };

  window.advert.createArray = function (address) {
    var adverts = [];

    var offerTitles = window.utility.sortArrayInRandomOrder(generatedAdvertParameter.TITLES.concat());

    for (var i = 0; i < generatedAdvertParameter.AMOUNT; i++) {
      adverts[i] = createAdvertElement(generatedAdvertParameter.avatar.NUMBER_MIN + i, offerTitles[i], address);
    }

    return adverts;
  };
})();
