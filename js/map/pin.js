'use strict';

(function () {
  var pin = {};

  pin.ordinary = {};
  pin.ordinary.WIDTH = 56;
  pin.ordinary.HEIGHT = 75;
  pin.ordinary.DATASET_NAME = 'data-adverts-element-index';

  pin.main = {};
  pin.main.WIDTH = 75;
  pin.main.HEIGHT = 94;

  pin.main.defaultLocation = {};
  pin.main.defaultLocation.X = 600;
  pin.main.defaultLocation.Y = 300;

  pin.main.pointerDefaultLocation = {};
  pin.main.pointerDefaultLocation.X = pin.main.defaultLocation.X + window.utility.getHalfInteger(pin.main.WIDTH);
  pin.main.pointerDefaultLocation.Y = pin.main.defaultLocation.Y + pin.main.HEIGHT;

  var mainPinDragArea = {};
  mainPinDragArea.minX = window.data.advert.address.x.MIN - window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinDragArea.maxX = window.data.advert.address.x.MAX - window.utility.getHalfInteger(pin.main.WIDTH);
  mainPinDragArea.minY = window.data.advert.address.y.MIN - pin.main.HEIGHT;
  mainPinDragArea.maxY = window.data.advert.address.y.MAX - pin.main.HEIGHT;

  var domMainPin = window.mapData.domPinMap.querySelector('.pin__main');
  var domOrdinaryPinContainer = window.mapData.domPinMap.querySelector('.pin__container');
  var domOrdinaryPinTemplate = document.querySelector('#pin-template').content;


  var renderOrdinaryPin = function (advert, advertsElementIndex) {
    var domOrdinaryPin = domOrdinaryPinTemplate.cloneNode(true).querySelector('.pin');

    var ordinaryPinLocation = setOrdinaryPinLocation(advert.location);


    domOrdinaryPin.style.top = ordinaryPinLocation.y + 'px';
    domOrdinaryPin.style.left = ordinaryPinLocation.x + 'px';
    domOrdinaryPin.setAttribute(pin.ordinary.DATASET_NAME, advertsElementIndex);
    domOrdinaryPin.querySelector('.rounded').setAttribute('src', advert.author.avatar);


    return domOrdinaryPin;
  };

  var setOrdinaryPinLocation = function (advertLocation) {
    var ordinaryPinLocation = {};
    ordinaryPinLocation.x = advertLocation.x - window.utility.getHalfInteger(pin.ordinary.WIDTH);
    ordinaryPinLocation.y = advertLocation.y - pin.ordinary.HEIGHT;


    return ordinaryPinLocation;
  };

  var addOrdinaryVisibilityState = function (domOrdinaryPin) {
    domOrdinaryPin.classList.remove('hidden');
  };

  var removeOrdinaryVisibilityState = function (domOrdinaryPin) {
    domOrdinaryPin.classList.add('hidden');
  };

  var onMainPinPointerLocationChange = function () {
    window.form.setAddressValue(
        parseInt(domMainPin.style.left, 10) + window.utility.getHalfInteger(pin.main.WIDTH),
        parseInt(domMainPin.style.top, 10) + pin.main.HEIGHT
    );
  };


  domMainPin.addEventListener('mousedown', function (evt) {
    window.dragFreeElement(evt, domMainPin, mainPinDragArea, onMainPinPointerLocationChange);
  });


  window.pin = {};

  window.pin.getMainPointerDefaultLocation = function () {
    return pin.main.pointerDefaultLocation;
  };

  window.pin.resetMainPointerLocation = function () {
    domMainPin.style.top = '';
    domMainPin.style.left = '';
  };

  window.pin.renderOrdinaryCollection = function (adverts) {
    var fragment = document.createDocumentFragment();


    adverts.forEach(function (it, index) {
      fragment.appendChild(renderOrdinaryPin(it, index));
    });

    domOrdinaryPinContainer.appendChild(fragment);
  };

  window.pin.doActionIfChosen = function (domElement, cb) {
    var elementDataset = null;
    var domActivePin = window.mapData.domPinMap.querySelector('.pin--active');
    var activePinDataset = domActivePin ? domActivePin.getAttribute(pin.ordinary.DATASET_NAME) : null;


    while (domElement !== window.mapData.domPinMap) {
      elementDataset = domElement.getAttribute(pin.ordinary.DATASET_NAME);

      if (elementDataset && elementDataset !== activePinDataset) {
        cb(domElement, elementDataset);


        return;
      }

      domElement = domElement.parentNode;
    }
  };

  window.pin.addOrdinaryActiveState = function (domOrdinaryPin) {
    domOrdinaryPin.classList.add('pin--active');
    domOrdinaryPin.style.cursor = 'default';
  };

  window.pin.removeOrdinaryActiveState = function (domOrdinaryPin) {
    domOrdinaryPin.classList.remove('pin--active');
    domOrdinaryPin.style.cursor = 'pointer';
  };

  window.pin.showAndHideOrdinaryPins = function (advertStore) {
    Array.from(domOrdinaryPinContainer.children).forEach(function (it, index) {
      if (advertStore[String(index)]) {
        addOrdinaryVisibilityState(it);
      } else {
        removeOrdinaryVisibilityState(it);
      }
    });
  };

  window.pin.isActiveOrdinaryHidden = function (domActiveOrdinaryPin) {
    return domActiveOrdinaryPin.classList.contains('hidden');
  };
})();
