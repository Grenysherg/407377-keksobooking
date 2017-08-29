'use strict';

(function () {
  var pinMapDomElement = document.querySelector('.tokyo__pin-map');
  var pinTemplate = document.querySelector('#pin-template').content;
  var pinImageTemplate = pinTemplate.querySelector('.rounded');

  var pinParameter = {};
  pinParameter.WIDTH = parseInt(pinImageTemplate.getAttribute('width'), 10);
  pinParameter.HEIGHT = parseInt(pinImageTemplate.getAttribute('height'), 10);
  pinParameter.DATASET_NAME = 'data-advert-element-index';


  var renderPin = function (advertElement, advertElementIndex) {
    var pinDomElement = pinTemplate.cloneNode(true);
    var pinContainerDomElement = pinDomElement.querySelector('.pin');

    pinContainerDomElement.style.top = advertElement.location.y - pinParameter.HEIGHT + 'px';
    pinContainerDomElement.style.left = advertElement.location.x - pinParameter.WIDTH / 2 + 'px';
    pinContainerDomElement.setAttribute(pinParameter.DATASET_NAME, advertElementIndex);
    pinDomElement.querySelector('.rounded').setAttribute('src', advertElement.author.avatar);

    return pinDomElement;
  };


  window.pin = {};

  window.pin.getDatasetName = function () {
    return pinParameter.DATASET_NAME;
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
    var activePinDataset = activePin ? activePin.getAttribute(pinParameter.DATASET_NAME) : null;

    while (domElement !== pinMapDomElement) {
      domElementDataset = domElement.getAttribute(pinParameter.DATASET_NAME);

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
