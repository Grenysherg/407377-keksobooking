'use strict';

(function () {
  var domPinMap = document.querySelector('.tokyo__pin-map');
  var domMainPin = domPinMap.querySelector('.pin__main');
  var pinTemplate = document.querySelector('#pin-template').content;


  var pin = {};

  pin.ordinary = {};
  pin.ordinary.WIDTH = 56;
  pin.ordinary.HEIGHT = 75;
  pin.ordinary.DATASET_NAME = 'data-adverts-element-index';

  pin.main = {};
  pin.main.WIDTH = domMainPin.clientWidth;
  pin.main.HEIGHT = domMainPin.clientHeight;

  pin.main.address = {};

  pin.main.address.x = {};
  pin.main.address.x.MIN = window.mapData.address.x.MIN - window.utility.getHalfInteger(pin.main.WIDTH);
  pin.main.address.x.MAX = window.mapData.address.x.MAX - window.utility.getHalfInteger(pin.main.WIDTH);

  pin.main.address.y = {};
  pin.main.address.y.MIN = window.mapData.address.y.MIN - pin.main.HEIGHT;
  pin.main.address.y.MAX = window.mapData.address.y.MAX - pin.main.HEIGHT;


  var mainPinPointerLocation = {};
  mainPinPointerLocation.x = parseInt(getComputedStyle(domMainPin).left, 10) + window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinPointerLocation.y = parseInt(getComputedStyle(domMainPin).top, 10) + pin.main.HEIGHT;


  var renderDomPin = function (advert, advertsElementIndex) {
    var domPin = pinTemplate.cloneNode(true);
    var domPinContainer = domPin.querySelector('.pin');

    var pinLocation = getOrdinaryPinLocation(advert.location);

    domPinContainer.style.top = pinLocation.y + 'px';
    domPinContainer.style.left = pinLocation.x + 'px';
    domPinContainer.setAttribute(pin.ordinary.DATASET_NAME, advertsElementIndex);

    domPin.querySelector('.rounded').setAttribute('src', advert.author.avatar);

    return domPin;
  };


  var getOrdinaryPinLocation = function (advertLocation) {
    var pinLocation = {};
    pinLocation.x = advertLocation.x - window.utility.getHalfInteger(pin.ordinary.WIDTH);
    pinLocation.y = advertLocation.y - pin.ordinary.HEIGHT;

    return pinLocation;
  };


  var setAddressInputValue = function () {
    var addressInput = document.querySelector('#address');

    addressInput.value = window.utility.getLocationString(mainPinPointerLocation.x, mainPinPointerLocation.y);
  };


  setAddressInputValue();


  window.mapPin = {};

  window.mapPin.getDatasetName = function () {
    return pin.ordinary.DATASET_NAME;
  };

  window.mapPin.onMainPinClick = function (evt) {
    evt.preventDefault();

    var mouseStartCoordinate = {};
    mouseStartCoordinate.x = evt.clientX;
    mouseStartCoordinate.y = evt.clientY;

    var onDocumentMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {};
      shift.x = mouseStartCoordinate.x - moveEvt.clientX;
      shift.y = mouseStartCoordinate.y - moveEvt.clientY;

      var mainPinOffset = {};
      mainPinOffset.top = domMainPin.offsetTop - shift.y;
      mainPinOffset.left = domMainPin.offsetLeft - shift.x;

      if (mainPinOffset.top < pin.main.address.y.MIN || mainPinOffset.top > pin.main.address.y.MAX || mainPinOffset.left < pin.main.address.x.MIN || mainPinOffset.left > pin.main.address.x.MAX) {
        return;
      }

      mouseStartCoordinate.x = moveEvt.clientX;
      mouseStartCoordinate.y = moveEvt.clientY;

      domMainPin.style.top = mainPinOffset.top + 'px';
      domMainPin.style.left = mainPinOffset.left + 'px';

      mainPinPointerLocation.x -= shift.x;
      mainPinPointerLocation.y -= shift.y;

      setAddressInputValue();
    };

    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };


  window.mapPin.renderCollection = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderDomPin(adverts[i], i));
    }

    domPinMap.appendChild(fragment);
  };

  window.mapPin.doActionIfDomElementIs = function (domElement, action) {
    var elementDataset = null;
    var activePin = domPinMap.querySelector('.pin--active');
    var activePinDataset = activePin ? activePin.getAttribute(pin.ordinary.DATASET_NAME) : null;

    while (domElement !== domPinMap) {
      elementDataset = domElement.getAttribute(pin.ordinary.DATASET_NAME);

      if (elementDataset && elementDataset !== activePinDataset) {
        action(domElement);

        return;
      }

      domElement = domElement.parentNode;
    }
  };


  window.mapPin.addActiveState = function (domPin) {
    domPin.classList.add('pin--active');
    domPin.style.cursor = 'default';
  };

  window.mapPin.removeActiveState = function (domPin) {
    domPin.classList.remove('pin--active');
    domPin.style.cursor = 'pointer';
  };
})();
