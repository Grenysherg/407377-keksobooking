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

  var mainPinDragArea = {};
  mainPinDragArea.minX = window.mapData.address.x.MIN - window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinDragArea.maxX = window.mapData.address.x.MAX - window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinDragArea.minY = window.mapData.address.y.MIN - pin.main.HEIGHT;
  mainPinDragArea.maxY = window.mapData.address.y.MAX - pin.main.HEIGHT;

  var mainPinPointerLocation = {};
  mainPinPointerLocation.x = parseInt(getComputedStyle(domMainPin).left, 10) + window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinPointerLocation.y = parseInt(getComputedStyle(domMainPin).top, 10) + pin.main.HEIGHT;


  /* utilities */


  var renderPin = function (advert, advertsElementIndex) {
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

  var setCurrentLocation = function () {
    mainPinPointerLocation.x = parseInt(domMainPin.style.left, 10) + window.utility.getHalfInteger(pin.main.WIDTH);
    mainPinPointerLocation.y = parseInt(domMainPin.style.top, 10) + pin.main.HEIGHT;

    setAddressInputValue();
  };


  /* main */


  setAddressInputValue();


  /* external functions */


  window.mapPin = {};

  window.mapPin.getDatasetName = function () {
    return pin.ordinary.DATASET_NAME;
  };

  window.mapPin.renderCollection = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderPin(adverts[i], i));
    }

    domPinMap.appendChild(fragment);
  };

  window.mapPin.doActionIfDomElementIs = function (domElement, action) {
    var domElementDataset = null;
    var domActivePin = domPinMap.querySelector('.pin--active');
    var domActivePinDataset = domActivePin ? domActivePin.getAttribute(pin.ordinary.DATASET_NAME) : null;

    while (domElement !== domPinMap) {
      domElementDataset = domElement.getAttribute(pin.ordinary.DATASET_NAME);

      if (domElementDataset && domElementDataset !== domActivePinDataset) {
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

  window.mapPin.onMainClick = function (evt) {
    window.dragFreeElement(evt, domMainPin, mainPinDragArea, setCurrentLocation);
  };
})();
