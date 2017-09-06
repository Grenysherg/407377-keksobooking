'use strict';

(function () {
  var domCard = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var lodgePhoto = {};
  lodgePhoto.ALT = 'Lodge photo';
  lodgePhoto.WIDTH = 52;
  lodgePhoto.HEIGHT = 42;


  var renderFeatures = function (features) {
    var domFeature = null;
    var fragment = document.createDocumentFragment();

    features.forEach(function (featuresElement) {
      domFeature = document.createElement('span');
      domFeature.classList.add('feature__image', 'feature__image--' + featuresElement);

      fragment.appendChild(domFeature);
    });

    return fragment;
  };

  var renderImg = function (src, alt, width, height) {
    var domImg = document.createElement('img');
    domImg.setAttribute('src', src);
    domImg.setAttribute('alt', alt);
    domImg.setAttribute('width', width);
    domImg.setAttribute('height', height);

    return domImg;
  };

  var renderLodgePhotos = function (photoSources) {
    var fragment = document.createDocumentFragment();

    photoSources.forEach(function (it) {
      fragment.appendChild(renderImg(it, lodgePhoto.ALT, lodgePhoto.WIDTH, lodgePhoto.HEIGHT));
    });

    return fragment;
  };

  var getGuestAndRoomString = function (guestNumber, roomNumber) {
    var guestString = guestNumber === 1 ? ' гостя' : ' гостей';
    var roomString = roomNumber === 1 ? ' комнате' : ' комнатах';

    return 'Для ' + guestNumber + guestString + ' в ' + roomNumber + roomString;
  };


  window.mapCard = {};

  window.mapCard.renderElement = function (advert) {
    var domCardPanel = domCard.querySelector('.dialog__panel');
    var domCardNewPanel = lodgeTemplate.cloneNode(true);


    domCardNewPanel.querySelector('.lodge__title').textContent = advert.offer.title;
    domCardNewPanel.querySelector('.lodge__address').textContent = advert.offer.address;
    domCardNewPanel.querySelector('.lodge__price').textContent = advert.offer.price + window.data.sign.RUBLE + '/ночь';
    domCardNewPanel.querySelector('.lodge__type').textContent = window.data.advert.lodgeType[advert.offer.type].VALUE;
    domCardNewPanel.querySelector('.lodge__rooms-and-guests').textContent
      = getGuestAndRoomString(advert.offer.guests, advert.offer.rooms);
    domCardNewPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout;
    domCardNewPanel.querySelector('.lodge__features').appendChild(renderFeatures(advert.offer.features));
    domCardNewPanel.querySelector('.lodge__description').textContent = advert.offer.description;
    domCardNewPanel.querySelector('.lodge__photos').appendChild(renderLodgePhotos(advert.offer.photos));

    domCard.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);
    domCard.replaceChild(domCardNewPanel, domCardPanel);
  };
})();
