'use strict';

(function () {
  var pinMapDomElement = document.querySelector('.tokyo__pin-map');

  var offerDialogDomElement = document.querySelector('#offer-dialog');
  var offerDialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');

  var currentPin = null;


  var generatedAdvertParameter = {};

  generatedAdvertParameter.AMOUNT = 8;
  generatedAdvertParameter.INITIAL_INDEX = 0;

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

  generatedAdvertParameter.TYPES = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  generatedAdvertParameter.room = {};
  generatedAdvertParameter.room.MIN = 1;
  generatedAdvertParameter.room.MAX = 5;

  generatedAdvertParameter.guest = {};
  generatedAdvertParameter.guest.MIN = 1;

  generatedAdvertParameter.CHECKIN_TIME = ['12:00', '13:00', '14:00'];

  generatedAdvertParameter.CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

  generatedAdvertParameter.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var renderAdvertElement = function (avatarNumber, offerTitle) {
    var advertElement = {};

    advertElement.author = {};
    avatarNumber = avatarNumber < 10 ? '0' + avatarNumber : avatarNumber;
    advertElement.author.avatar = 'img/avatars/user' + avatarNumber + '.png';

    advertElement.location = {};
    advertElement.location.x = window.data.renderRandomInteger(generatedAdvertParameter.locationX.MIN, generatedAdvertParameter.locationX.MAX);
    advertElement.location.y = window.data.renderRandomInteger(generatedAdvertParameter.locationY.MIN, generatedAdvertParameter.locationY.MAX);

    advertElement.offer = {};
    advertElement.offer.title = offerTitle;
    advertElement.offer.address = advertElement.location.x + ', ' + advertElement.location.y;
    advertElement.offer.price = window.data.renderRandomInteger(generatedAdvertParameter.price.MIN, generatedAdvertParameter.price.MAX);
    advertElement.offer.type = window.data.getRandomObjectKey(generatedAdvertParameter.TYPES);
    advertElement.offer.rooms = window.data.renderRandomInteger(generatedAdvertParameter.room.MIN, generatedAdvertParameter.room.MAX);
    advertElement.offer.guests = window.data.renderRandomInteger(generatedAdvertParameter.guest.MIN, advertElement.offer.rooms);
    advertElement.offer.checkin = window.data.getRandomArrayElement(generatedAdvertParameter.CHECKIN_TIME);
    advertElement.offer.checkout = window.data.getRandomArrayElement(generatedAdvertParameter.CHECKOUT_TIME);
    advertElement.offer.features = window.data.getRandomUniqueArrayElements(generatedAdvertParameter.FEATURES);
    advertElement.offer.description = '';
    advertElement.offer.photos = [];

    return advertElement;
  };

  var renderAdverts = function () {
    var adverts = [];

    var offerTitles = window.data.sortArrayElementsRandomOrder(generatedAdvertParameter.TITLES.concat());

    for (var i = 0; i < generatedAdvertParameter.AMOUNT; i++) {
      adverts[i] = renderAdvertElement(generatedAdvertParameter.avatar.NUMBER_MIN + i, offerTitles[i]);
    }

    return adverts;
  };


  var openOfferDialog = function (target) {
    if (currentPin) {
      window.pin.removeActiveState(currentPin);
    } else {
      offerDialogDomElement.classList.remove('hidden');

      addCloseOfferDialogEvents();
    }

    currentPin = target;
    var currentPinId = currentPin.getAttribute('id');
    var currentAdvertIndex = Number(currentPinId.slice(window.pin.getIdString().length));

    window.pin.addActiveState(currentPin);
    window.card.renderOfferDialog(adverts[currentAdvertIndex], generatedAdvertParameter.TYPES);
  };

  var closeOfferDialog = function () {
    window.pin.removeActiveState(currentPin);
    currentPin = null;

    offerDialogDomElement.classList.add('hidden');

    removeCloseOfferDialogEvents();
  };


  var onPinMapClick = function (evt) {
    window.pin.isCurrentDomElement(evt.target, openOfferDialog);
  };

  var onPinMapEnterPress = function (evt) {
    if (window.data.ifEnterPressed(evt)) {
      window.pin.isCurrentDomElement(evt.target, openOfferDialog);
    }
  };

  var onOfferDialogCloseClick = function (evt) {
    evt.preventDefault();

    closeOfferDialog();
  };

  var onOfferDialogCloseEnterPress = function (evt) {
    evt.preventDefault();

    if (window.data.ifEnterPressed(evt)) {
      closeOfferDialog();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (window.data.ifEscPressed(evt)) {
      closeOfferDialog();
    }
  };


  var addEventsPinMap = function () {
    pinMapDomElement.addEventListener('click', onPinMapClick);
    pinMapDomElement.addEventListener('keydown', onPinMapEnterPress);
  };

  var addEventsOfferDialogClose = function () {
    offerDialogCloseDomElement.addEventListener('click', onOfferDialogCloseClick);
    offerDialogCloseDomElement.addEventListener('keydown', onOfferDialogCloseEnterPress);
  };

  var removeEventsOfferDialogClose = function () {
    offerDialogCloseDomElement.removeEventListener('click', onOfferDialogCloseClick);
    offerDialogCloseDomElement.removeEventListener('keydown', onOfferDialogCloseEnterPress);
  };

  var addCloseOfferDialogEvents = function () {
    addEventsOfferDialogClose();
    document.addEventListener('keydown', onDocumentEscPress);
  };

  var removeCloseOfferDialogEvents = function () {
    removeEventsOfferDialogClose();
    document.removeEventListener('keydown', onDocumentEscPress);
  };


  var adverts = renderAdverts();
  window.pin.renderDomElements(adverts);

  addEventsPinMap();
  openOfferDialog(pinMapDomElement.querySelector('#' + window.pin.getIdString() + generatedAdvertParameter.INITIAL_INDEX));
})();
