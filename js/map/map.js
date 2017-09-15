'use strict';

(function () {
  var domActiveOrdinaryPin = null;

  var advertStore = {};

  var domCardClose = window.mapData.domCard.querySelector('.dialog__close');


  var openCard = function (domOrdinaryPin, advertStoreKey) {
    if (domActiveOrdinaryPin) {
      window.pin.removeOrdinaryActiveState(domActiveOrdinaryPin);
    } else {
      window.card.addVisibilityState();

      addCardCloseEvents();
      document.addEventListener('keydown', onDocumentEscPress);
    }

    window.pin.addOrdinaryActiveState(domOrdinaryPin);
    domActiveOrdinaryPin = domOrdinaryPin;

    window.card.render(advertStore[advertStoreKey]);
  };

  var closeCard = function () {
    window.pin.removeOrdinaryActiveState(domActiveOrdinaryPin);
    domActiveOrdinaryPin = null;

    window.card.removeVisibilityState();

    removeCardCloseEvents();
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  var onDomPinMapClick = function (evt) {
    window.pin.doActionIfChosen(evt.target, openCard);
  };

  var onDomPinMapEnterPress = function (evt) {
    if (window.utility.isEnterPressed(evt)) {
      window.pin.doActionIfChosen(evt.target, openCard);
    }
  };

  var onDomCardCloseClick = function (evt) {
    evt.preventDefault();

    closeCard();
  };

  var onDomCardCloseEnterPress = function (evt) {
    evt.preventDefault();

    if (window.utility.isEnterPressed(evt)) {
      closeCard();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (window.utility.isEscPressed(evt)) {
      closeCard();
    }
  };

  var addPinMapEvents = function () {
    window.mapData.domPinMap.addEventListener('click', onDomPinMapClick);
    window.mapData.domPinMap.addEventListener('keydown', onDomPinMapEnterPress);
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

  window.map.update = function (newAdvertStore) {
    advertStore = newAdvertStore;

    window.pin.showAndHideOrdinaryPins(advertStore);

    if (domActiveOrdinaryPin) {
      if (window.pin.isActiveOrdinaryHidden(domActiveOrdinaryPin)) {
        closeCard();
      }
    }
  };
})();
