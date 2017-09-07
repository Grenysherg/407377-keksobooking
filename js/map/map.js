'use strict';

(function () {
  var domPinMap = document.querySelector('.tokyo__pin-map');
  var domMainPin = domPinMap.querySelector('.pin__main');

  var domCard = document.querySelector('#offer-dialog');
  var domCardClose = domCard.querySelector('.dialog__close');


  /* utilities */


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


  /* Открытие/закрытие окна карточки */


  var openCard = function (domPin) {
    var domActivePin = domPinMap.querySelector('.pin--active');

    if (domActivePin) {
      window.mapPin.removeActiveState(domActivePin);
    } else {
      domCard.classList.remove('hidden');

      addCardCloseEvents();
      document.addEventListener('keydown', onDocumentEscPress);
    }

    var advertsElementIndex = domPin.getAttribute(window.mapPin.getDatasetName());

    window.mapPin.addActiveState(domPin);
    window.mapCard.renderElement(adverts[advertsElementIndex]);
  };

  var closeCard = function () {
    var domActivePin = domPinMap.querySelector('.pin--active');
    window.mapPin.removeActiveState(domActivePin);

    domCard.classList.add('hidden');

    removeCardCloseEvents();
    document.removeEventListener('keydown', onDocumentEscPress);
  };


  /* Обработчики событий */


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


  /* main */


  addPinMapEvents();
  domMainPin.addEventListener('mousedown', window.mapPin.onMainClick);

  var adverts = window.mapAdvert.createArray();

  window.backend.load(
      'https://1510.dump.academy/keksobooking/data',
      function (loadAdverts) {
        adverts = adverts.concat(loadAdverts);

        window.mapPin.renderCollection(adverts);

        openCard(domPinMap.children[1]);
        domCard.classList.remove('hidden');
      },
      function () {
        window.utility.showSystemMessage('Произошла ошибка при загрузке данных', 'error');
      });
})();
