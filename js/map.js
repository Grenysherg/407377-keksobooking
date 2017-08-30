'use strict';

(function () {
  var pinMapDomElement = document.querySelector('.tokyo__pin-map');

  var offerDialogDomElement = document.querySelector('#offer-dialog');
  var offerDialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');


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
    var currentAdvertIndex = currentPin.getAttribute(window.pin.getDatasetName());

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
    if (window.util.isEnterPressed(evt)) {
      window.pin.doActionIfDomElement(evt.target, openOfferDialog);
    }
  };

  var onOfferDialogCloseClick = function (evt) {
    evt.preventDefault();

    closeOfferDialog();
  };

  var onOfferDialogCloseEnterPress = function (evt) {
    evt.preventDefault();

    if (window.util.isEnterPressed(evt)) {
      closeOfferDialog();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
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


  /* Основной код */

  var adverts = window.advert.createArray();
  window.pin.createDomElements(adverts);

  addEventsPinMap();
  openOfferDialog(pinMapDomElement.querySelector('[' + window.pin.getDatasetName() + '="' + ADVERT_INITIAL_ELEMENT_INDEX + '"]'));
})();
