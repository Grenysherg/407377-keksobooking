'use strict';

(function () {
  var pinMapDomElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainPinDomElement = pinMapDomElement.querySelector('.pin__main');

  var offerDialogDomElement = document.querySelector('#offer-dialog');
  var offerDialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');

  var formAddress = document.querySelector('#address');


  var address = {};

  address.x = {};
  address.x.MIN = 300;
  address.x.MAX = 1100;

  address.y = {};
  address.y.MIN = 200;
  address.y.MAX = 650;


  var pinMainAddress = {};

  pinMainAddress.x = {};
  pinMainAddress.x.MIN = address.x.MIN - window.utility.getHalfInteger(window.pin.getObject().main.WIDTH);
  pinMainAddress.x.MAX = address.x.MAX - window.utility.getHalfInteger(window.pin.getObject().main.WIDTH);

  pinMainAddress.y = {};
  pinMainAddress.y.MIN = address.y.MIN - window.pin.getObject().main.HEIGHT;
  pinMainAddress.y.MAX = address.y.MAX - window.pin.getObject().main.HEIGHT;


  var currentPin = null;

  var ADVERT_INITIAL_ELEMENT_INDEX = 0;


  var openOfferDialog = function (target) {
    if (currentPin) {
      window.pin.removeActiveState(currentPin);
    } else {
      offerDialogDomElement.classList.remove('hidden');

      addCloseOfferDialogEvents();
    }

    currentPin = target;
    var currentAdvertIndex = currentPin.getAttribute(window.pin.getObject().normal.DATASET_NAME);

    window.pin.addActiveState(currentPin);
    window.card.renderOfferDialog(adverts[currentAdvertIndex], window.advert.getType());
  };

  var closeOfferDialog = function () {
    window.pin.removeActiveState(currentPin);
    currentPin = null;

    offerDialogDomElement.classList.add('hidden');

    removeCloseOfferDialogEvents();
  };


  var onPinMapClick = function (evt) {
    window.pin.doActionIfDomElement(evt.target, openOfferDialog);
  };

  var onPinMapEnterPress = function (evt) {
    if (window.key.isEnterPressed(evt)) {
      window.pin.doActionIfDomElement(evt.target, openOfferDialog);
    }
  };

  var onOfferDialogCloseClick = function (evt) {
    evt.preventDefault();

    closeOfferDialog();
  };

  var onOfferDialogCloseEnterPress = function (evt) {
    evt.preventDefault();

    if (window.key.isEnterPressed(evt)) {
      closeOfferDialog();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (window.key.isEscPressed(evt)) {
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


  /* Перетаскивание pin */

  var getMainPinPointerAddress = function (pinX, pinY) {
    var pointerAddress = {};
    pointerAddress.x = pinX + window.utility.getHalfInteger(window.pin.getObject().main.WIDTH);
    pointerAddress.y = pinY + window.pin.getObject().main.HEIGHT;

    return pointerAddress;
  };

  var setFormAddress = function (pinX, pinY) {
    var pointerAddress = getMainPinPointerAddress(pinX, pinY);

    formAddress.value = 'x: ' + pointerAddress.x + ', y: ' + pointerAddress.y;
  };

  var onPinMapMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordinate = {};
    startCoordinate.x = evt.clientX;
    startCoordinate.y = evt.clientY;

    var onDocumentMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {};
      shift.x = startCoordinate.x - moveEvt.clientX;
      shift.y = startCoordinate.y - moveEvt.clientY;

      var pinMapMainPinCoordinate = {};
      pinMapMainPinCoordinate.top = pinMapMainPinDomElement.offsetTop - shift.y;
      pinMapMainPinCoordinate.left = pinMapMainPinDomElement.offsetLeft - shift.x;

      if (pinMapMainPinCoordinate.top < pinMainAddress.y.MIN || pinMapMainPinCoordinate.top > pinMainAddress.y.MAX || pinMapMainPinCoordinate.left < pinMainAddress.x.MIN || pinMapMainPinCoordinate.left > pinMainAddress.x.MAX) {
        return;
      }

      startCoordinate.x = moveEvt.clientX;
      startCoordinate.y = moveEvt.clientY;

      pinMapMainPinDomElement.style.top = pinMapMainPinCoordinate.top + 'px';
      pinMapMainPinDomElement.style.left = pinMapMainPinCoordinate.left + 'px';

      setFormAddress(pinMapMainPinCoordinate.left, pinMapMainPinCoordinate.top);
    };

    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };


  /* Основной код */

  var adverts = window.advert.createArray(address);
  window.pin.createDomElements(adverts);

  addEventsPinMap();
  openOfferDialog(pinMapDomElement.querySelector('[' + window.pin.getObject().normal.DATASET_NAME + '="' + ADVERT_INITIAL_ELEMENT_INDEX + '"]'));

  setFormAddress(parseInt(getComputedStyle(pinMapMainPinDomElement).top, 10), parseInt(getComputedStyle(pinMapMainPinDomElement).left, 10));

  pinMapMainPinDomElement.addEventListener('mousedown', onPinMapMainPinMouseDown);
})();
