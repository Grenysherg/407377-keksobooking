'use strict';

(function () {
  var domCard = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;


  var renderDomFeatures = function (features) {
    var domFeature = null;
    var fragment = document.createDocumentFragment();

    features.forEach(function (featuresElement) {
      domFeature = document.createElement('span');
      domFeature.classList.add('feature__image', 'feature__image--' + featuresElement);

      fragment.appendChild(domFeature);
    });

    return fragment;
  };


  window.card = {};

  window.card.renderDomElement = function (advert) {
    var domCardPanel = domCard.querySelector('.dialog__panel');
    var newDomCardPanel = lodgeTemplate.cloneNode(true);

    newDomCardPanel.querySelector('.lodge__title').textContent = advert.offer.title;
    newDomCardPanel.querySelector('.lodge__address').textContent = advert.offer.address;
    newDomCardPanel.querySelector('.lodge__price').textContent = advert.offer.price + window.data.sign.RUBLE + '/ночь';
    newDomCardPanel.querySelector('.lodge__type').textContent = window.data.advert.lodgeType[advert.offer.type].VALUE;
    newDomCardPanel.querySelector('.lodge__rooms-and-guests').textContent = window.data.advert.room[advert.offer.rooms] + ' ' + window.data.advert.capacity.VALUES[advert.offer.guests];
    newDomCardPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    newDomCardPanel.querySelector('.lodge__features').appendChild(renderDomFeatures(advert.offer.features));
    newDomCardPanel.querySelector('.lodge__description').textContent = advert.offer.description;

    domCard.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);
    domCard.replaceChild(newDomCardPanel, domCardPanel);
  };
})();
