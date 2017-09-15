'use strict';

(function () {
  var domCardTemplate = document.querySelector('#lodge-template').content;


  var takeGuestAndRoomString = function (guestNumber, roomNumber) {
    var guestString = guestNumber === 1 ? ' гостя' : ' гостей';
    var roomString = roomNumber === 1 ? ' комнате' : ' комнатах';


    return 'Для ' + guestNumber + guestString + ' в ' + roomNumber + roomString;
  };

  var renderFeatures = function (features) {
    var domFeaturesElement = null;

    var fragment = document.createDocumentFragment();


    features.forEach(function (it) {
      domFeaturesElement = document.createElement('span');
      domFeaturesElement.classList.add('feature__image', 'feature__image--' + it);

      fragment.appendChild(domFeaturesElement);
    });


    return fragment;
  };

  var renderPreviewPhotos = function (photoSources) {
    var fragment = document.createDocumentFragment();

    var img = {};
    img.alt = window.data.advert.previewPhoto.ALT;
    img.width = window.data.advert.previewPhoto.WIDTH;
    img.height = window.data.advert.previewPhoto.HEIGHT;


    photoSources.forEach(function (it) {
      img.src = it;

      fragment.appendChild(window.utility.renderImg(img));
    });


    return fragment;
  };


  window.card = {};

  window.card.render = function (advert) {
    var domCardPanel = window.mapData.domCard.querySelector('.dialog__panel');
    var domCardNewPanel = domCardTemplate.cloneNode(true);


    window.mapData.domCard.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);

    domCardNewPanel.querySelector('.lodge__title').textContent = advert.offer.title;
    domCardNewPanel.querySelector('.lodge__address').textContent = advert.offer.address;
    domCardNewPanel.querySelector('.lodge__price').textContent = advert.offer.price + window.data.sign.RUBLE + '/ночь';
    domCardNewPanel.querySelector('.lodge__type').textContent = window.data.advert.type[advert.offer.type].RUS_VALUE;
    domCardNewPanel.querySelector('.lodge__rooms-and-guests').textContent
      = takeGuestAndRoomString(advert.offer.guests, advert.offer.rooms);
    domCardNewPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout;
    domCardNewPanel.querySelector('.lodge__features').appendChild(renderFeatures(advert.offer.features));
    domCardNewPanel.querySelector('.lodge__description').textContent = advert.offer.description;
    domCardNewPanel.querySelector('.lodge__photos').appendChild(renderPreviewPhotos(advert.offer.photos));

    window.mapData.domCard.replaceChild(domCardNewPanel, domCardPanel);
  };

  window.card.addVisibilityState = function () {
    window.mapData.domCard.classList.remove('hidden');
  };

  window.card.removeVisibilityState = function () {
    window.mapData.domCard.classList.add('hidden');
  };
})();
