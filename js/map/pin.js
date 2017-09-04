'use strict';

(function () {
  var domPinMap = document.querySelector('.tokyo__pin-map');
  var domMainPin = domPinMap.querySelector('.pin__main');
  var pinTemplate = document.querySelector('#pin-template').content;


  var pin = {};

  pin.normal = {};
  pin.normal.WIDTH = 56;
  pin.normal.HEIGHT = 75;
  pin.normal.DATASET_NAME = 'data-adverts-element-index';

  pin.main = {};
  pin.main.WIDTH = domMainPin.clientWidth;
  pin.main.HEIGHT = domMainPin.clientHeight;


  var getNormalPinLocation = function (advertLocation) {
    var pinLocation = {};
    pinLocation.x = advertLocation.x - window.utility.getHalfInteger(pin.normal.WIDTH);
    pinLocation.y = advertLocation.y - pin.normal.HEIGHT;

    return pinLocation;
  };


  var renderDomPin = function (advert, advertsElementIndex) {
    var domPin = pinTemplate.cloneNode(true);
    var domPinContainer = domPin.querySelector('.pin');

    var pinLocation = getNormalPinLocation(advert.location);

    domPinContainer.style.top = pinLocation.y + 'px';
    domPinContainer.style.left = pinLocation.x + 'px';
    domPinContainer.setAttribute(pin.normal.DATASET_NAME, advertsElementIndex);

    domPin.querySelector('.rounded').setAttribute('src', advert.author.avatar);

    return domPin;
  };


  window.pin = {};

  window.pin.getObject = function () {
    return pin;
  };

  window.pin.renderCollection = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderDomPin(adverts[i], i));
    }

    domPinMap.appendChild(fragment);
  };

  window.pin.doActionIfDomElement = function (domElement, action) {
    var domElementDataset;
    var activePin = domPinMap.querySelector('.pin--active');
    var activePinDataset = activePin ? activePin.getAttribute(pin.normal.DATASET_NAME) : null;

    while (domElement !== domPinMap) {
      domElementDataset = domElement.getAttribute(pin.normal.DATASET_NAME);

      if (domElementDataset && domElementDataset !== activePinDataset) {
        action(domElement);

        return;
      }

      domElement = domElement.parentNode;
    }
  };

  window.pin.addActiveState = function (domPin) {
    domPin.classList.add('pin--active');
    domPin.style.cursor = 'default';
  };

  window.pin.removeActiveState = function (domPin) {
    domPin.classList.remove('pin--active');
    domPin.style.cursor = 'pointer';
  };
})();
