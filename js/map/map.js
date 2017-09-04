'use strict';

(function () {
  var domPinMap = document.querySelector('.tokyo__pin-map');
  var domMainPin = domPinMap.querySelector('.pin__main');

  var domCard = document.querySelector('#offer-dialog');
  var domCardClose = domCard.querySelector('.dialog__close');


  var openCard = function (domPin) {
    var domActivePin = domPinMap.querySelector('.pin--active');

    if (domActivePin) {
      window.mapPin.removeActiveState(domActivePin);
    } else {
      domCard.classList.remove('hidden');

      addCardCloseEvents();
      document.addEventListener('keydown', onDocumentEscPress);
    }

    var advertsCurrentElementIndex = domPin.getAttribute(window.mapPin.getDatasetName());

    window.mapPin.addActiveState(domPin);
    window.mapCard.renderDomElement(adverts[advertsCurrentElementIndex]);
  };

  var closeCard = function () {
    var domActivePin = domPinMap.querySelector('.pin--active');
    window.mapPin.removeActiveState(domActivePin);

    domCard.classList.add('hidden');

    removeCardCloseEvents();
    document.removeEventListener('keydown', onDocumentEscPress);
  };


  var onPinMapClick = function (evt) {
    window.mapPin.doActionIfDomElementIs(evt.target, openCard);
  };

  var onPinMapEnterPress = function (evt) {
    if (window.key.isEnterPressed(evt)) {
      window.mapPin.doActionIfDomElementIs(evt.target, openCard);
    }
  };

  var onCardCloseClick = function (evt) {
    evt.preventDefault();

    closeCard();
  };

  var onCardCloseEnterPress = function (evt) {
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
    domPinMap.addEventListener('click', onPinMapClick);
    domPinMap.addEventListener('keydown', onPinMapEnterPress);
  };

  var addCardCloseEvents = function () {
    domCardClose.addEventListener('click', onCardCloseClick);
    domCardClose.addEventListener('keydown', onCardCloseEnterPress);
  };

  var removeCardCloseEvents = function () {
    domCardClose.removeEventListener('click', onCardCloseClick);
    domCardClose.removeEventListener('keydown', onCardCloseEnterPress);
  };


  var adverts = window.mapAdvert.createArray();
  window.mapPin.renderCollection(adverts);

  addPinMapEvents();
  domMainPin.addEventListener('mousedown', window.mapPin.onMainPinClick);

  openCard(domPinMap.children[1]);
})();
