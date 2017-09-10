'use strict';

(function () {
  var domPinMap = document.querySelector('.tokyo__pin-map');

  var domCard = document.querySelector('#offer-dialog');
  var domCardClose = domCard.querySelector('.dialog__close');

  var domActiveOrdinaryPin = null;

  var advertList = {};


  var openCard = function (domOrdinaryPin, advertListKey) {
    if (domActiveOrdinaryPin) {
      window.mapPin.removeOrdinaryActiveState(domActiveOrdinaryPin);
    } else {
      window.mapCard.addVisibilityState();

      addCardCloseEvents();
      document.addEventListener('keydown', onDocumentEscPress);
    }

    window.mapPin.addOrdinaryActiveState(domOrdinaryPin);
    domActiveOrdinaryPin = domOrdinaryPin;

    window.mapCard.render(advertList[advertListKey]);
  };

  var closeCard = function () {
    window.mapPin.removeOrdinaryActiveState(domActiveOrdinaryPin);
    domActiveOrdinaryPin = null;

    window.mapCard.removeVisibilityState();

    removeCardCloseEvents();
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  var onDomPinMapClick = function (evt) {
    window.mapPin.doActionIfChosen(evt.target, openCard);
  };

  var onDomPinMapEnterPress = function (evt) {
    if (window.key.isEnterPressed(evt)) {
      window.mapPin.doActionIfChosen(evt.target, openCard);
    }
  };

  var onDomCardCloseClick = function (evt) {
    evt.preventDefault();

    closeCard();
  };

  var onDomCardCloseEnterPress = function (evt) {
    evt.preventDefault();

    if (window.key.isEnterPressed(evt)) {
      closeCard();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (window.key.isEscPressed(evt)) {
      closeCard();
    }
  };

  var addPinMapEvents = function () {
    domPinMap.addEventListener('click', onDomPinMapClick);
    domPinMap.addEventListener('keydown', onDomPinMapEnterPress);
  };

  var addCardCloseEvents = function () {
    domCardClose.addEventListener('click', onDomCardCloseClick);
    domCardClose.addEventListener('keydown', onDomCardCloseEnterPress);
  };

  var removeCardCloseEvents = function () {
    domCardClose.removeEventListener('click', onDomCardCloseClick);
    domCardClose.removeEventListener('keydown', onDomCardCloseEnterPress);
  };


  addPinMapEvents();


  window.map = {};

  window.map.update = function (newAdvertList) {
    advertList = newAdvertList;

    window.mapPin.showAndHideOrdinaryPins(advertList);

    if (domActiveOrdinaryPin) {
      if (domActiveOrdinaryPin.classList.contains('hidden')) {
        closeCard();
      }
    }
  };
})();
