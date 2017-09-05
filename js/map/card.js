'use strict';

(function () {
  var domCard = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;


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


  window.mapCard = {};

  window.mapCard.renderElement = function (advert) {
    var domCardPanel = domCard.querySelector('.dialog__panel');
    var domCardNewPanel = lodgeTemplate.cloneNode(true);


    domCardNewPanel.querySelector('.lodge__title').textContent = advert.offer.title;
    domCardNewPanel.querySelector('.lodge__address').textContent = advert.offer.address;
    domCardNewPanel.querySelector('.lodge__price').textContent = advert.offer.price + window.data.sign.RUBLE + '/ночь';
    domCardNewPanel.querySelector('.lodge__type').textContent = window.data.advert.lodgeType[advert.offer.type].VALUE;
    domCardNewPanel.querySelector('.lodge__rooms-and-guests').textContent = window.data.advert.room[advert.offer.rooms] + ' ' + window.data.advert.capacity.VALUES[advert.offer.guests];
    domCardNewPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    domCardNewPanel.querySelector('.lodge__features').appendChild(renderFeatures(advert.offer.features));
    domCardNewPanel.querySelector('.lodge__description').textContent = advert.offer.description;
    domCard.querySelector('.dialog__title img').setAttribute('src', advert.author.avatar);

    domCard.replaceChild(domCardNewPanel, domCardPanel);
  };
})();
