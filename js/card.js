'use strict';

(function () {
  var offerDialogDomElement = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;


  var createOfferDialogFeatureDomElements = function (features) {
    var featureElement;
    var fragment = document.createDocumentFragment();

    features.forEach(function (featuresElement) {
      featureElement = document.createElement('span');
      featureElement.classList.add('feature__image', 'feature__image--' + featuresElement);

      fragment.appendChild(featureElement);
    });

    return fragment;
  };


  window.card = {};

  window.card.renderOfferDialog = function (advertElement, advertTypes) {
    var newOfferDialogPanelDomElement = lodgeTemplate.cloneNode(true);
    var offerDialogPanelDomElement = offerDialogDomElement.querySelector('.dialog__panel');

    newOfferDialogPanelDomElement.querySelector('.lodge__title').textContent = advertElement.offer.title;
    newOfferDialogPanelDomElement.querySelector('.lodge__address').textContent = advertElement.offer.address;
    newOfferDialogPanelDomElement.querySelector('.lodge__price').textContent = advertElement.offer.price + window.data.sign.RUBLE + '/ночь';
    newOfferDialogPanelDomElement.querySelector('.lodge__type').textContent = advertTypes[advertElement.offer.type];
    newOfferDialogPanelDomElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advertElement.offer.guests + ' гостей в ' + advertElement.offer.rooms + ' комнатах';
    newOfferDialogPanelDomElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advertElement.offer.checkin + ', выезд до ' + advertElement.offer.checkout;
    newOfferDialogPanelDomElement.querySelector('.lodge__features').appendChild(createOfferDialogFeatureDomElements(advertElement.offer.features));
    newOfferDialogPanelDomElement.querySelector('.lodge__description').textContent = advertElement.offer.description;

    offerDialogDomElement.querySelector('.dialog__title img').setAttribute('src', advertElement.author.avatar);
    offerDialogDomElement.replaceChild(newOfferDialogPanelDomElement, offerDialogPanelDomElement);
  };
})();
