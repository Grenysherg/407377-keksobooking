'use strict';

(function () {
  var pinMapDomElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainPinDomElement = pinMapDomElement.querySelector('.pin__main');

  var pinTemplate = document.querySelector('#pin-template').content;

  var pin = {};

  pin.normal = {};
  pin.normal.WIDTH = 56;
  pin.normal.HEIGHT = 75;
  pin.normal.DATASET_NAME = 'data-advert-element-index';

  pin.main = {};
  pin.main.WIDTH = pinMapMainPinDomElement.clientWidth;
  pin.main.HEIGHT = pinMapMainPinDomElement.clientHeight;


  var renderPin = function (advertElement, advertElementIndex) {
    var pinDomElement = pinTemplate.cloneNode(true);
    var pinContainerDomElement = pinDomElement.querySelector('.pin');

    pinContainerDomElement.style.top = advertElement.location.y - pin.normal.HEIGHT + 'px';
    pinContainerDomElement.style.left = advertElement.location.x - window.util.getHalfInteger(pin.normal.WIDTH) + 'px';
    pinContainerDomElement.setAttribute(pin.normal.DATASET_NAME, advertElementIndex);
    pinDomElement.querySelector('.rounded').setAttribute('src', advertElement.author.avatar);

    return pinDomElement;
  };


  window.pin = {};

  window.pin.getObject = function () {
    return pin;
  };

  window.pin.createDomElements = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderPin(adverts[i], i));
    }

    pinMapDomElement.appendChild(fragment);
  };

  window.pin.doActionIfDomElement = function (domElement, action) {
    var domElementDataset;
    var activePin = pinMapDomElement.querySelector('.pin--active');
    var activePinDataset = activePin ? activePin.getAttribute(pin.normal.DATASET_NAME) : null;

    while (domElement !== pinMapDomElement) {
      domElementDataset = domElement.getAttribute(pin.normal.DATASET_NAME);

      if (domElementDataset && domElementDataset !== activePinDataset) {
        action(domElement);

        return;
      }

      domElement = domElement.parentNode;
    }
  };

  window.pin.addActiveState = function (pinDomElement) {
    pinDomElement.classList.add('pin--active');
    pinDomElement.style.cursor = 'default';
  };

  window.pin.removeActiveState = function (pinDomElement) {
    pinDomElement.classList.remove('pin--active');
    pinDomElement.style.cursor = 'pointer';
  };
})();