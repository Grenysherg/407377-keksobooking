'use strict';

(function () {
  var domCard = document.querySelector('#offer-dialog');
  var domCardAvatar = domCard.querySelector('.dialog__title img');
  var domCardPanel = domCard.querySelector('.dialog__panel');
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

  window.card.getDomElement = function () {
    return domCard;
  };

  window.card.render = function (advert) {
    var domCardPanelContent = domCardTemplate.cloneNode(true);


    domCardAvatar.setAttribute('src', advert.author.avatar);

    domCardPanelContent.querySelector('.lodge__title').textContent = advert.offer.title;
    domCardPanelContent.querySelector('.lodge__address').textContent = advert.offer.address;
    domCardPanelContent.querySelector('.lodge__price').textContent = advert.offer.price + window.data.sign.RUBLE + '/ночь';
    domCardPanelContent.querySelector('.lodge__type').textContent = window.data.advert.type[advert.offer.type].RUS_VALUE;
    domCardPanelContent.querySelector('.lodge__rooms-and-guests').textContent
      = takeGuestAndRoomString(advert.offer.guests, advert.offer.rooms);
    domCardPanelContent.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout;
    domCardPanelContent.querySelector('.lodge__features').appendChild(renderFeatures(advert.offer.features));
    domCardPanelContent.querySelector('.lodge__description').textContent = advert.offer.description;
    domCardPanelContent.querySelector('.lodge__photos').appendChild(renderPreviewPhotos(advert.offer.photos));

    domCardPanel.innerHTML = '';
    domCardPanel.appendChild(domCardPanelContent);
  };

  window.card.addVisibilityState = function () {
    domCard.classList.remove('hidden');
  };

  window.card.removeVisibilityState = function () {
    domCard.classList.add('hidden');
  };
})();
