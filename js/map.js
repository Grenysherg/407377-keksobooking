'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pinTemplate = document.querySelector('#pin-template').content;
var pinTemplateImg = pinTemplate.querySelector('.rounded');

var offerDialog = document.querySelector('#offer-dialog');
var offerDialogClose = offerDialog.querySelector('.dialog__close');
var offerDialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var keyCodes = {};
keyCodes.ENTER = 13;
keyCodes.ESC = 27;

var signs = {};
signs.RUBLE = String.fromCharCode(8381);

var pins = {};
pins.ID_STRING = 'Pin';

var advertParameters = {};

advertParameters.AMOUNT = 8;
advertParameters.INITIAL_INDEX = 0;

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

var createRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[createRandomInteger(0, array.length - 1)];
};

var getRandomObjectKey = function (object) {
  var keys = Object.keys(object);

  return keys[createRandomInteger(0, keys.length - 1)];
};

var getRandomUniqueArrayElements = function (array, newLength) {
  var element;
  var uniqueElements = [];
  var store = {};

  newLength = newLength || createRandomInteger(0, array.length - 1);

  for (var i = 0; i < newLength; i++) {
    do {
      element = getRandomArrayElement(array);
    } while (store[String(element)]);

    uniqueElements[i] = element;
    store[String(element)] = true;
  }

  return uniqueElements;
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

var addEventListenersOfferDialogClose = function () {
  offerDialogClose.addEventListener('click', onOfferDialogCloseClick);
  offerDialogClose.addEventListener('keydown', onOfferDialogCloseEscPress);
};

var addEventListenersPin = function () {
  currentPin.addEventListener('click', onPinClick);
  currentPin.addEventListener('keydown', onPinEnterPress);
};

var addEventListenersPins = function () {
  for (var i = 1; i < pinMap.children.length; i++) {
    pinMap.children[i].addEventListener('click', onPinClick);
    pinMap.children[i].addEventListener('keydown', onPinEnterPress);
  }
};

var addPinClassActive = function () {
  currentPin.classList.add('pin--active');
  currentPin.style.cursor = 'default';
};

var closeOfferDialog = function () {
  removePinClassActive();
  addEventListenersPin();
  currentPin = null;

  offerDialogClose.style.cursor = 'default';
  offerDialog.classList.add('hidden');

  removeEventListenersOfferDialogClose();
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
  advert.offer.type = getRandomObjectKey(advertParameters.TYPES);
  advert.offer.rooms = createRandomInteger(advertParameters.room.MIN, advertParameters.room.MAX);
  advert.offer.guests = createRandomInteger(advertParameters.guest.MIN, advert.offer.rooms);
  advert.offer.checkin = getRandomArrayElement(advertParameters.CHECKIN_TIME);
  advert.offer.checkout = getRandomArrayElement(advertParameters.CHECKOUT_TIME);
  advert.offer.features = getRandomUniqueArrayElements(advertParameters.FEATURES);
  advert.offer.description = '';
  advert.offer.photos = [];

  return advert;
};

var createAdverts = function () {
  var adverts = [];

  var offerTitles = sortArrayElementsRandomOrder(advertParameters.TITLES.concat());

  for (var i = 0; i < advertParameters.AMOUNT; i++) {
    adverts[i] = createAdvert(advertParameters.avatar.NUMBER_MIN + i, offerTitles[i]);
  }

  return adverts;
};

var createOfferDialog = function (advert) {
  var dialogElement = lodgeTemplate.cloneNode(true);

  dialogElement.querySelector('.lodge__title').textContent = advert.offer.title;
  dialogElement.querySelector('.lodge__address').textContent = advert.offer.address;
  dialogElement.querySelector('.lodge__price').textContent = advert.offer.price + signs.RUBLE + '/ночь';
  dialogElement.querySelector('.lodge__type').textContent = advertParameters.TYPES[advert.offer.type];
  dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  dialogElement.querySelector('.lodge__features').appendChild(createOfferDialogFeatures(advert.offer.features));
  dialogElement.querySelector('.lodge__description').textContent = advert.offer.description;

  offerDialog.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);
  offerDialog.replaceChild(dialogElement, offerDialogPanel);
  offerDialogPanel = offerDialog.querySelector('.dialog__panel');
};

var createOfferDialogFeatures = function (features) {
  var feature;
  var fragment = document.createDocumentFragment();

  features.forEach(function (featuresElement) {
    feature = document.createElement('span');
    feature.setAttribute('class', 'feature__image feature__image--' + featuresElement);

    fragment.appendChild(feature);
  });

  return fragment;
};

var createPin = function (advert, advertIndex) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementContainer = pinElement.querySelector('.pin');

  pinElementContainer.setAttribute('style', 'left: ' + (advert.location.x - advertParameters.pin.WIDTH / 2) + 'px; top: ' + (advert.location.y - advertParameters.pin.HEIGHT) + 'px');
  pinElementContainer.setAttribute('id', pins.ID_STRING + advertIndex);
  pinElement.querySelector('.rounded').setAttribute('src', advert.author.avatar);

  return pinElement;
};

var createPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i], i));
  }

  pinMap.appendChild(fragment);
};

var openOfferDialog = function (evt) {
  if (currentPin) {
    removePinClassActive();
    addEventListenersPin();
  } else {
    offerDialog.classList.remove('hidden');
    offerDialogClose.style.cursor = 'pointer';

    addEventListenersOfferDialogClose();
  }

  currentPin = evt.currentTarget;
  var currentPinId = currentPin.getAttribute('id');
  var currentAdvertIndex = Number(currentPinId.slice(pins.ID_STRING.length));

  showCurrentPinAndCurrentAdvert(currentAdvertIndex);
};

var removeEventListenersOfferDialogClose = function () {
  offerDialogClose.removeEventListener('click', onOfferDialogCloseClick);
  offerDialogClose.removeEventListener('keydown', onOfferDialogCloseEscPress);
};

var removeEventListenersPin = function () {
  currentPin.removeEventListener('click', onPinClick);
  currentPin.removeEventListener('keydown', onPinEnterPress);
};

var removePinClassActive = function () {
  currentPin.classList.remove('pin--active');
  currentPin.style.cursor = 'pointer';
};

var showCurrentPinAndCurrentAdvert = function (currentAdvertIndex) {
  addPinClassActive();
  removeEventListenersPin();

  createOfferDialog(adverts[currentAdvertIndex]);
};

var onOfferDialogCloseClick = function (evt) {
  evt.preventDefault();
  closeOfferDialog();
};

var onOfferDialogCloseEscPress = function (evt) {
  evt.preventDefault();

  if (evt.keyCode === keyCodes.ESC) {
    closeOfferDialog();
  }
};

var onPinClick = function (evt) {
  evt.preventDefault();
  openOfferDialog(evt);
};

var onPinEnterPress = function (evt) {
  evt.preventDefault();

  if (evt.keyCode === keyCodes.ENTER) {
    openOfferDialog(evt);
  }
};

var adverts = createAdverts();
createPins();
addEventListenersPins();

var currentPin = pinMap.querySelector('#' + pins.ID_STRING + advertParameters.INITIAL_INDEX);
showCurrentPinAndCurrentAdvert(advertParameters.INITIAL_INDEX);
addEventListenersOfferDialogClose();
