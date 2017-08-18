'use strict';

var RUBLE_SIGN = String.fromCharCode(8381);

var avatar = {};
avatar.NUMBER_MIN = 1;

var locationX = {};
locationX.MIN = 300;
locationX.MAX = 900;

var locationY = {};
locationY.MIN = 100;
locationY.MAX = 500;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var price = {};
price.MIN = 1000;
price.MAX = 1000000;

var TYPES = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

var room = {};
room.MIN = 1;
room.MAX = 5;

var guest = {};
guest.MIN = 1;

var CHECKIN_TIME = ['12:00', '13:00', '14:00'];

var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var pinMap = document.querySelector('.tokyo__pin-map');
var pinTemplate = document.querySelector('#pin-template').content;
var pinTemplateImg = pinTemplate.querySelector('.rounded');

var pin = {};
pin.WIDTH = parseInt(pinTemplateImg.getAttribute('width'), 10);
pin.HEIGHT = parseInt(pinTemplateImg.getAttribute('height'), 10);

var offerDialog = document.querySelector('#offer-dialog');
var offerDialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var createAdvertElement = function (avatarNumber, offerTitle) {
  var advertElement = {};
  advertElement.author = {};
  avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
  advertElement.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

  advertElement.location = {};
  advertElement.location.x = createRandomInteger(locationX.MIN, locationX.MAX);
  advertElement.location.y = createRandomInteger(locationY.MIN, locationY.MAX);

  advertElement.offer = {};
  advertElement.offer.title = offerTitle;
  advertElement.offer.address = advertElement.location.x + ', ' + advertElement.location.y;
  advertElement.offer.price = createRandomInteger(price.MIN, price.MAX);
  advertElement.offer.type = returnRandomObjectKey(TYPES);
  advertElement.offer.rooms = createRandomInteger(room.MIN, room.MAX);
  advertElement.offer.guests = createRandomInteger(guest.MIN, advertElement.offer.rooms);
  advertElement.offer.checkin = returnRandomArrayElement(CHECKIN_TIME);
  advertElement.offer.checkout = returnRandomArrayElement(CHECKOUT_TIME);
  advertElement.offer.features = returnRandomUniqueArrayElements(FEATURES);
  advertElement.offer.description = '';
  advertElement.offer.photos = [];

  return advertElement;
};

var createOfferDialog = function (advertElement) {
  var dialogElement = lodgeTemplate.cloneNode(true);

  dialogElement.querySelector('.lodge__title').textContent = advertElement.offer.title;
  dialogElement.querySelector('.lodge__address').textContent = advertElement.offer.address;
  dialogElement.querySelector('.lodge__price').textContent = advertElement.offer.price + RUBLE_SIGN + '/ночь';
  dialogElement.querySelector('.lodge__type').textContent = TYPES[advertElement.offer.type];
  dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advertElement.offer.guests + ' гостей в ' + advertElement.offer.rooms + ' комнатах';
  dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advertElement.offer.checkin + ', выезд до ' + advertElement.offer.checkout;
  dialogElement.querySelector('.lodge__features').appendChild(createOfferDialogFeatures(advertElement.offer.features));
  dialogElement.querySelector('.lodge__description').textContent = advertElement.offer.description;

  offerDialog.querySelector('.dialog__title img').setAttribute('src', advertElement.author.avatar);
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

var createRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

var createPin = function (advertElement) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.pin').setAttribute('style', 'left: ' + (advertElement.location.x - pin.WIDTH / 2) + 'px; top: ' + (advertElement.location.y - pin.HEIGHT) + 'px');
  pinElement.querySelector('.rounded').setAttribute('src', advertElement.author.avatar);

  return pinElement;
};

var createPins = function (advertElements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertElements.length; i++) {
    fragment.appendChild(createPin(advertElements[i]));
  }

  pinMap.appendChild(fragment);
};

var returnRandomArrayElement = function (array) {
  return array[createRandomInteger(0, array.length - 1)];
};

var returnRandomUniqueArrayElements = function (array) {
  var currentElement;
  var newArray = [];
  var store = {};
  var randomNewArrayLength = createRandomInteger(0, array.length - 1);

  for (var i = 0; i < randomNewArrayLength; i++) {
    do {
      currentElement = returnRandomArrayElement(array);
    } while (store[String(currentElement)]);

    newArray[i] = currentElement;
    store[String(currentElement)] = true;
  }

  return newArray;
};

var returnRandomObjectKey = function (object) {
  var keys = Object.keys(object);

  return keys[createRandomInteger(0, keys.length - 1)];
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

var advert = {};
advert.AMOUNT = 8;
advert.values = [];
advert.createValues = function () {
  var avatarNumbers = createRandomUniqueIntegers(avatar.NUMBER_MIN, advert.AMOUNT, advert.AMOUNT);
  var offerTitles = sortArrayElementsRandomOrder(TITLES.concat());

  for (var i = 0; i < advert.AMOUNT; i++) {
    this.values[i] = createAdvertElement(avatarNumbers.pop(), offerTitles.pop());
  }
};

advert.createValues();
createPins(advert.values);
createOfferDialog(advert.values[0]);
