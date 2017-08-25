'use strict';

var form = document.querySelector('.notice__form');

var offerTitle = {};
offerTitle.element = form.querySelector('#title');
offerTitle.MIN_LENGTH = 30;
offerTitle.MAX_LENGTH = 100;

var lodgeType = {};
lodgeType.element = form.querySelector('#type');
lodgeType.current = lodgeType.element.value;

lodgeType.bungalo = {};
lodgeType.bungalo.VALUE = 'Бунгало';
lodgeType.bungalo.MIN_PRICE = 0;

lodgeType.flat = {};
lodgeType.flat.VALUE = 'Квартира';
lodgeType.flat.MIN_PRICE = 1000;

lodgeType.house = {};
lodgeType.house.VALUE = 'Дом';
lodgeType.house.MIN_PRICE = 5000;

lodgeType.palace = {};
lodgeType.palace.VALUE = 'Дворец';
lodgeType.palace.MIN_PRICE = 10000;

var price = {};
price.element = form.querySelector('#price');
price.DEFAULT = 1000;
price.MAX = 1000000;

price.element.setAttribute('value', String(price.DEFAULT));
price.element.setAttribute('min', String(lodgeType[lodgeType.current].MIN_PRICE));
price.element.setAttribute('max', String(price.MAX));

var timeIn = {};
timeIn.element = form.querySelector('#timein');

var timeOut = {};
timeOut.element = form.querySelector('#timeout');

var onOfferTitleInput = function (evt) {
  var target = evt.target;

  if (target.value.length < offerTitle.MIN_LENGTH) {
    target.setCustomValidity('Минимум символов: ' + offerTitle.MIN_LENGTH);
    offerTitle.element.style.borderColor = 'red';
  } else if (target.value.length > offerTitle.MAX_LENGTH) {
    target.setCustomValidity('Максимум символов: ' + offerTitle.MAX_LENGTH);
    offerTitle.element.style.borderColor = 'red';
  } else {
    target.setCustomValidity('');
    offerTitle.element.style.borderColor = 'green';
  }
};

var onOfferTitleInvalid = function () {
  if (offerTitle.element.validity.valueMissing) {
    offerTitle.element.setCustomValidity('Обязательное поле');
    offerTitle.element.style.borderColor = 'red';
  }
};

var onLodgeTypeChange = function (evt) {
  var target = evt.target;

  lodgeType.current = target.value;
  price.element.setAttribute('min', String(lodgeType[lodgeType.current].MIN_PRICE));
};

var onPriceInvalid = function () {
  var currentLodgeType = lodgeType[lodgeType.current];

  if (price.element.validity.valueMissing) {
    price.element.setCustomValidity('Обязательное поле');
    price.element.style.borderColor = 'red';
  } else if (price.element.validity.rangeUnderflow) {
    price.element.setCustomValidity('Для типа жилья "' + currentLodgeType.VALUE + '" минимальная цена: ' + currentLodgeType.MIN_PRICE);
    price.element.style.borderColor = 'red';
  } else if (price.element.validity.rangeOverflow) {
    price.element.setCustomValidity('Максимально возможная цена: ' + price.MAX);
    price.element.style.borderColor = 'red';
  } else {
    price.element.setCustomValidity('');
    price.element.style.borderColor = 'green';
  }
};

var onTimeInChange = function (evt) {
  var target = evt.target;

  timeOut.element.value = target.value;
};

var onTimeOutChange = function (evt) {
  var target = evt.target;

  timeIn.element.value = target.value;
};

offerTitle.element.addEventListener('invalid', onOfferTitleInvalid);
offerTitle.element.addEventListener('input', onOfferTitleInput);

lodgeType.element.addEventListener('change', onLodgeTypeChange);

price.element.addEventListener('invalid', onPriceInvalid);

timeIn.element.addEventListener('change', onTimeInChange);

timeOut.element.addEventListener('change', onTimeOutChange);

