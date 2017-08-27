'use strict';

var form = document.querySelector('.notice__form');
var formOfferTitle = form.querySelector('#title');
var formLodgeType = form.querySelector('#type');
var formPrice = form.querySelector('#price');
var formRoomAmount = form.querySelector('#room_number');
var formCapacity = form.querySelector('#capacity');
var formAddress = form.querySelector('#address');
var formTimeIn = form.querySelector('#timein');
var formTimeOut = form.querySelector('#timeout');

var validityMessage = {};
validityMessage.EMPTY_FIELD = 'Обязательное поле';

var offerTitle = {};
offerTitle.MIN_LENGTH = 30;
offerTitle.MAX_LENGTH = Number(formOfferTitle.getAttribute('maxlength'));


var lodgeType = {};
lodgeType.current = formLodgeType.value;

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
price.DEFAULT = lodgeType[lodgeType.current].MIN_PRICE;
price.MAX = Number(formPrice.getAttribute('max'));

var roomAmount = {};
roomAmount.current = Number(formRoomAmount.value);
roomAmount.NO_CAPACITY = 100;

var capacity = {};
capacity.getProperties = function () {
  this.emptyOption = formCapacity.options[formCapacity.options.length - 1];
  formCapacity.remove(formCapacity.options.length - 1);
  this.select = formCapacity.cloneNode(true);
};


var setErrorColorFormInput = function (formInput) {
  formInput.setAttribute('style', 'border-color: red');
};

var setValidColorFormInput = function (formInput) {
  formInput.removeAttribute('style');
};

var addValidityEventsForm = function () {
  formOfferTitle.addEventListener('input', onFormOfferTitleInput);
  formOfferTitle.addEventListener('invalid', onFormOfferTitleInvalid);

  formLodgeType.addEventListener('change', onFormLodgeTypeChange);

  formPrice.addEventListener('invalid', onFormPriceInvalid);

  formRoomAmount.addEventListener('change', onFormRoomAmountChange);

  formAddress.addEventListener('invalid', onFormAddressInvalid);

  formTimeIn.addEventListener('change', onTimeInChange);
  formTimeOut.addEventListener('change', onTimeOutChange);
};


/* Валидация ввода заголовка объявления */

var onFormOfferTitleInput = function (evt) {
  var target = evt.target;

  if (target.value.length < offerTitle.MIN_LENGTH) {
    formOfferTitle.setCustomValidity('Минимально возможное количество символов: ' + offerTitle.MIN_LENGTH);
    setErrorColorFormInput(formOfferTitle);
  } else {
    formOfferTitle.setCustomValidity('');
    setValidColorFormInput(formOfferTitle);
  }
};

var onFormOfferTitleInvalid = function () {
  if (!formOfferTitle.validity.valid) {
    if (formOfferTitle.validity.valueMissing) {
      formOfferTitle.setCustomValidity(validityMessage.EMPTY_FIELD);
      setErrorColorFormInput(formOfferTitle);
    } else if (formOfferTitle.validity.tooLong) {
      formOfferTitle.setCustomValidity('Максимально возможное количество символов: ' + offerTitle.MAX_LENGTH);
      setErrorColorFormInput(formOfferTitle);
    }
  } else {
    formOfferTitle.setCustomValidity('');
    setValidColorFormInput(formOfferTitle);
  }
};


/* Валидация ввода цены */

var setMinFormPrice = function () {
  formPrice.setAttribute('min', String(lodgeType[lodgeType.current].MIN_PRICE));
};

var onFormLodgeTypeChange = function (evt) {
  var target = evt.target;
  lodgeType.current = target.value;

  setMinFormPrice();
};

var onFormPriceInvalid = function () {
  var currentLodgeType = lodgeType[lodgeType.current];

  if (!formPrice.validity.valid) {
    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(validityMessage.EMPTY_FIELD);
      setErrorColorFormInput(formPrice);
    } else if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Для типа жилья "' + currentLodgeType.VALUE + '" минимально возможная цена: ' + currentLodgeType.MIN_PRICE);
      setErrorColorFormInput(formPrice);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Максимально возможная цена: ' + price.MAX);
      setErrorColorFormInput(formPrice);
    }
  } else {
    formPrice.setCustomValidity('');
    setValidColorFormInput(formPrice);
  }
};


/* Валидация выбора количества комнат/гостей */

var setCurrentCapacityOptions = function () {
  formCapacity.options.length = 0;

  if (roomAmount.current === roomAmount.NO_CAPACITY) {
    formCapacity.appendChild(capacity.emptyOption);

    return;
  }

  var fragment = document.createDocumentFragment();
  var i = capacity.select.options.length - roomAmount.current || 0;

  for (; i < capacity.select.options.length; i++) {
    fragment.appendChild(capacity.select.options[i].cloneNode(true));
  }

  formCapacity.appendChild(fragment);
};

var onFormRoomAmountChange = function (evt) {
  var target = evt.target;

  roomAmount.current = Number(target.value);
  setCurrentCapacityOptions();
};


/* Валидация ввода адреса */

var onFormAddressInvalid = function () {
  if (!formPrice.validity.valid) {
    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(validityMessage.EMPTY_FIELD);
      setErrorColorFormInput(formPrice);
    }
  } else {
    formPrice.setCustomValidity('');
    setValidColorFormInput(formPrice);
  }
};


/* Валидация выбора времени заезда/выезда */

var onTimeInChange = function (evt) {
  var target = evt.target;

  formTimeOut.value = target.value;
};

var onTimeOutChange = function (evt) {
  var target = evt.target;

  formTimeIn.value = target.value;
};


formPrice.setAttribute('value', price.DEFAULT);
setMinFormPrice();

capacity.getProperties();
setCurrentCapacityOptions();

addValidityEventsForm();

