'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pinTemplate = document.querySelector('#pin-template').content;
var pinTemplateImg = pinTemplate.querySelector('.rounded');

var offerDialog = document.querySelector('#offer-dialog');
var offerDialogClose = offerDialog.querySelector('.dialog__close');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var keyCode = {};
keyCode.ENTER = 13;
keyCode.ESC = 27;

var sign = {};
sign.RUBLE = String.fromCharCode(8381);

var pin = {};
pin.ID_STRING = 'Pin';

var advertParameter = {};

advertParameter.AMOUNT = 8;
advertParameter.INITIAL_INDEX = 0;

advertParameter.avatar = {};
advertParameter.avatar.NUMBER_MIN = 1;

advertParameter.locationX = {};
advertParameter.locationX.MIN = 300;
advertParameter.locationX.MAX = 900;

advertParameter.locationY = {};
advertParameter.locationY.MIN = 100;
advertParameter.locationY.MAX = 500;

advertParameter.TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

advertParameter.price = {};
advertParameter.price.MIN = 1000;
advertParameter.price.MAX = 1000000;

advertParameter.TYPES = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

advertParameter.room = {};
advertParameter.room.MIN = 1;
advertParameter.room.MAX = 5;

advertParameter.guest = {};
advertParameter.guest.MIN = 1;

advertParameter.CHECKIN_TIME = ['12:00', '13:00', '14:00'];

advertParameter.CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

advertParameter.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

advertParameter.pin = {};
advertParameter.pin.WIDTH = parseInt(pinTemplateImg.getAttribute('width'), 10);
advertParameter.pin.HEIGHT = parseInt(pinTemplateImg.getAttribute('height'), 10);

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

var createAdvert = function (avatarNumber, offerTitle) {
  var advert = {};

  advert.author = {};
  avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
  advert.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

  advert.location = {};
  advert.location.x = createRandomInteger(advertParameter.locationX.MIN, advertParameter.locationX.MAX);
  advert.location.y = createRandomInteger(advertParameter.locationY.MIN, advertParameter.locationY.MAX);

  advert.offer = {};
  advert.offer.title = offerTitle;
  advert.offer.address = advert.location.x + ', ' + advert.location.y;
  advert.offer.price = createRandomInteger(advertParameter.price.MIN, advertParameter.price.MAX);
  advert.offer.type = getRandomObjectKey(advertParameter.TYPES);
  advert.offer.rooms = createRandomInteger(advertParameter.room.MIN, advertParameter.room.MAX);
  advert.offer.guests = createRandomInteger(advertParameter.guest.MIN, advert.offer.rooms);
  advert.offer.checkin = getRandomArrayElement(advertParameter.CHECKIN_TIME);
  advert.offer.checkout = getRandomArrayElement(advertParameter.CHECKOUT_TIME);
  advert.offer.features = getRandomUniqueArrayElements(advertParameter.FEATURES);
  advert.offer.description = '';
  advert.offer.photos = [];

  return advert;
};

var createAdverts = function () {
  var adverts = [];

  var offerTitles = sortArrayElementsRandomOrder(advertParameter.TITLES.concat());

  for (var i = 0; i < advertParameter.AMOUNT; i++) {
    adverts[i] = createAdvert(advertParameter.avatar.NUMBER_MIN + i, offerTitles[i]);
  }

  return adverts;
};

var createOfferDialog = function (advert) {
  var dialogElement = lodgeTemplate.cloneNode(true);
  var offerDialogPanel = offerDialog.querySelector('.dialog__panel');

  dialogElement.querySelector('.lodge__title').textContent = advert.offer.title;
  dialogElement.querySelector('.lodge__address').textContent = advert.offer.address;
  dialogElement.querySelector('.lodge__price').textContent = advert.offer.price + sign.RUBLE + '/ночь';
  dialogElement.querySelector('.lodge__type').textContent = advertParameter.TYPES[advert.offer.type];
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

  pinElementContainer.setAttribute('style', 'left: ' + (advert.location.x - advertParameter.pin.WIDTH / 2) + 'px; top: ' + (advert.location.y - advertParameter.pin.HEIGHT) + 'px');
  pinElementContainer.setAttribute('id', pin.ID_STRING + advertIndex);
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

var openOfferDialog = function (target) {
  if (pin.current) {
    removePinClassActive();
  } else {
    offerDialog.classList.remove('hidden');

    addEventListenersOfferDialogClose();
  }

  pin.current = target;
  var currentPinId = pin.current.getAttribute('id');
  var currentAdvertIndex = Number(currentPinId.slice(pin.ID_STRING.length));

  showCurrentPinAndCurrentAdvert(currentAdvertIndex);
};

var closeOfferDialog = function () {
  removePinClassActive();
  pin.current = null;

  offerDialog.classList.add('hidden');

  removeEventListenersOfferDialogClose();
};

var addEventListenersPinMap = function () {
  pinMap.addEventListener('click', onPinMapClick);
  pinMap.addEventListener('keydown', onPinMapEnterPress);
};

var addEventListenersOfferDialogClose = function () {
  offerDialogClose.addEventListener('click', onOfferDialogCloseClick);
  offerDialogClose.addEventListener('keydown', onOfferDialogCloseEnterPress);
};

var removeEventListenersOfferDialogClose = function () {
  offerDialogClose.removeEventListener('click', onOfferDialogCloseClick);
  offerDialogClose.removeEventListener('keydown', onOfferDialogCloseEnterPress);
};

var addPinClassActive = function () {
  pin.current.classList.add('pin--active');
  pin.current.style.cursor = 'default';
};

var removePinClassActive = function () {
  pin.current.classList.remove('pin--active');
  pin.current.style.cursor = 'pointer';
};

var checkCurrentPinMapElement = function (evt) {
  var target = evt.target;
  var currentPinId = pin.current ? pin.current.getAttribute('id') : null;

  while (target !== pinMap) {
    if (target.id && target.id !== currentPinId) {
      openOfferDialog(target);

      return;
    }

    target = target.parentNode;
  }
};

var showCurrentPinAndCurrentAdvert = function (currentAdvertIndex) {
  addPinClassActive();

  createOfferDialog(adverts[currentAdvertIndex]);
};

var onOfferDialogCloseClick = function (evt) {
  evt.preventDefault();
  closeOfferDialog();
};

var onOfferDialogCloseEnterPress = function (evt) {
  evt.preventDefault();

  if (evt.keyCode === keyCode.ENTER) {
    closeOfferDialog();
  }
};

var onPinMapClick = function (evt) {
  checkCurrentPinMapElement(evt);
};

var onPinMapEnterPress = function (evt) {
  if (evt.keyCode === keyCode.ENTER) {
    checkCurrentPinMapElement(evt);
  }
};

var adverts = createAdverts();
createPins();

pin.current = pinMap.querySelector('#' + pin.ID_STRING + advertParameter.INITIAL_INDEX);
showCurrentPinAndCurrentAdvert(advertParameter.INITIAL_INDEX);
addEventListenersPinMap();
addEventListenersOfferDialogClose();
