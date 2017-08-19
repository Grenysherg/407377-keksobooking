'use strict';

var RUBLE_SIGN = String.fromCharCode(8381);

var pinMap = document.querySelector('.tokyo__pin-map');
var pinTemplate = document.querySelector('#pin-template').content;
var pinTemplateImg = pinTemplate.querySelector('.rounded');

var offerDialog = document.querySelector('#offer-dialog');
var offerDialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var advertParameters = {};

advertParameters.AMOUNT = 8;

advertParameters.avatar = {};
advertParameters.avatar.NUMBER_MIN = 1;

advertParameters.locationX = {};
advertParameters.locationX.MIN = 300;
advertParameters.locationX.MAX = 900;

advertParameters.locationY = {};
advertParameters.locationY.MIN = 100;
advertParameters.locationY.MAX = 500;

advertParameters.TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

advertParameters.price = {};
advertParameters.price.MIN = 1000;
advertParameters.price.MAX = 1000000;

advertParameters.TYPES = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

advertParameters.room = {};
advertParameters.room.MIN = 1;
advertParameters.room.MAX = 5;

advertParameters.guest = {};
advertParameters.guest.MIN = 1;

advertParameters.CHECKIN_TIME = ['12:00', '13:00', '14:00'];

advertParameters.CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

advertParameters.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

advertParameters.pin = {};
advertParameters.pin.WIDTH = parseInt(pinTemplateImg.getAttribute('width'), 10);
advertParameters.pin.HEIGHT = parseInt(pinTemplateImg.getAttribute('height'), 10);

var returnRandomArrayElement = function (array) {
  return array[createRandomInteger(0, array.length - 1)];
};

var createRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var returnRandomObjectKey = function (object) {
  var keys = Object.keys(object);

  return keys[createRandomInteger(0, keys.length - 1)];
};

var returnRandomUniqueArrayElements = function (array, newLength) {
  var element;
  var uniqueElements = [];
  var store = {};

  newLength = newLength || createRandomInteger(0, array.length - 1);

  for (var i = 0; i < newLength; i++) {
    do {
      element = returnRandomArrayElement(array);
    } while (store[String(element)]);

    uniqueElements[i] = element;
    store[String(element)] = true;
  }

  return uniqueElements;
};

var createRandomUniqueIntegers = function (min, max, amount) {
  var currentInteger;
  var integers = [];
  var store = {};

  for (var i = 0; i < amount; i++) {
    do {
      currentInteger = createRandomInteger(min, max);
    } while (store[String(currentInteger)]);

    integers[i] = currentInteger;
    store[String(currentInteger)] = true;
  }

  return integers;
};

var sortArrayElementsRandomOrder = function (array) {
  var number;
  var store;

  for (var i = array.length - 1; i > 0; i--) {
    number = Math.floor(Math.random() * (i + 1));
    store = array[number];
    array[number] = array[i];
    array[i] = store;
  }

  return array;
};

var createAdvert = function (avatarNumber, offerTitle) {
  var advert = {};

  advert.author = {};
  avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
  advert.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

  advert.location = {};
  advert.location.x = createRandomInteger(advertParameters.locationX.MIN, advertParameters.locationX.MAX);
  advert.location.y = createRandomInteger(advertParameters.locationY.MIN, advertParameters.locationY.MAX);

  advert.offer = {};
  advert.offer.title = offerTitle;
  advert.offer.address = advert.location.x + ', ' + advert.location.y;
  advert.offer.price = createRandomInteger(advertParameters.price.MIN, advertParameters.price.MAX);
  advert.offer.type = returnRandomObjectKey(advertParameters.TYPES);
  advert.offer.rooms = createRandomInteger(advertParameters.room.MIN, advertParameters.room.MAX);
  advert.offer.guests = createRandomInteger(advertParameters.guest.MIN, advert.offer.rooms);
  advert.offer.checkin = returnRandomArrayElement(advertParameters.CHECKIN_TIME);
  advert.offer.checkout = returnRandomArrayElement(advertParameters.CHECKOUT_TIME);
  advert.offer.features = returnRandomUniqueArrayElements(advertParameters.FEATURES);
  advert.offer.description = '';
  advert.offer.photos = [];

  return advert;
};

var createAdverts = function () {
  var adverts = [];

  var avatarNumbers = createRandomUniqueIntegers(advertParameters.avatar.NUMBER_MIN, advertParameters.AMOUNT, advertParameters.AMOUNT);
  var offerTitles = sortArrayElementsRandomOrder(advertParameters.TITLES.concat());

  for (var i = 0; i < advertParameters.AMOUNT; i++) {
    adverts[i] = createAdvert(avatarNumbers[i], offerTitles[i]);
  }

  return adverts;
};

var createOfferDialog = function (advert) {
  var dialogElement = lodgeTemplate.cloneNode(true);

  dialogElement.querySelector('.lodge__title').textContent = advert.offer.title;
  dialogElement.querySelector('.lodge__address').textContent = advert.offer.address;
  dialogElement.querySelector('.lodge__price').textContent = advert.offer.price + RUBLE_SIGN + '/ночь';
  dialogElement.querySelector('.lodge__type').textContent = advertParameters.TYPES[advert.offer.type];
  dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  dialogElement.querySelector('.lodge__features').appendChild(createOfferDialogFeatures(advert.offer.features));
  dialogElement.querySelector('.lodge__description').textContent = advert.offer.description;

  offerDialog.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);
  offerDialog.replaceChild(dialogElement, offerDialogPanel);
};

var createOfferDialogFeatures = function (features) {
  var feature;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    feature = document.createElement('span');
    feature.setAttribute('class', 'feature__image feature__image--' + features[i]);

    fragment.appendChild(feature);
  }

  return fragment;
};

var createPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.pin').setAttribute('style', 'left: ' + (advert.location.x - advertParameters.pin.WIDTH / 2) + 'px; top: ' + (advert.location.y - advertParameters.pin.HEIGHT) + 'px');
  pinElement.querySelector('.rounded').setAttribute('src', advert.author.avatar);

  return pinElement;
};

var createPins = function (adverts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }

  pinMap.appendChild(fragment);
};

var adverts = createAdverts();
createPins(adverts);
createOfferDialog(adverts[0]);
