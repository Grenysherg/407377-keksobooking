'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var formOfferTitle = form.querySelector('#title');
  var formLodgeType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formRoomAmount = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formAddress = form.querySelector('#address');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');

  var currentValue = {};
  currentValue.lodgeType = formLodgeType.value;
  currentValue.roomAmount = Number(formRoomAmount.value);

  var validityMessage = {};
  validityMessage.EMPTY_FIELD = 'Обязательное поле';

  var offerTitle = {};
  offerTitle.MIN_LENGTH = 30;
  offerTitle.MAX_LENGTH = Number(formOfferTitle.getAttribute('maxlength'));


  var lodgeType = {};

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
  price.DEFAULT = lodgeType[currentValue.lodgeType].MIN_PRICE;
  price.MAX = Number(formPrice.getAttribute('max'));

  price.setDefaultProperty = function () {
    formPrice.setAttribute('value', this.DEFAULT);
  };


  var roomAmount = {};
  roomAmount.NO_CAPACITY = 100;

  var capacity = {};
  capacity.getProperties = function () {
    this.EMPTY_OPTION = formCapacity.options[formCapacity.options.length - 1];
    formCapacity.remove(formCapacity.options.length - 1);
    this.SELECT = formCapacity.cloneNode(true);
  };


  /* Общие функции */

  var setErrorColorFormInput = function (formInput) {
    formInput.style.borderColor = 'red';
  };

  var setValidColorFormInput = function (formInput) {
    formInput.style.borderColor = 'green';
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
    formPrice.setAttribute('min', String(lodgeType[currentValue.lodgeType].MIN_PRICE));
  };

  var onFormLodgeTypeChange = function (evt) {
    var target = evt.target;
    currentValue.lodgeType = target.value;

    setMinFormPrice();
  };

  var onFormPriceInvalid = function () {
    var currentLodgeType = lodgeType[currentValue.lodgeType];

    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(validityMessage.EMPTY_FIELD);
      setErrorColorFormInput(formPrice);
    } else if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Для типа жилья "' + currentLodgeType.VALUE + '" минимально возможная цена: ' + currentLodgeType.MIN_PRICE);
      setErrorColorFormInput(formPrice);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Максимально возможная цена: ' + price.MAX);
      setErrorColorFormInput(formPrice);
    } else {
      formPrice.setCustomValidity('');
      setValidColorFormInput(formPrice);
    }
  };


  /* Валидация выбора количества комнат/гостей */

  var setCurrentCapacityOptions = function () {
    formCapacity.options.length = 0;

    if (currentValue.roomAmount === roomAmount.NO_CAPACITY) {
      formCapacity.appendChild(capacity.EMPTY_OPTION);

      return;
    }

    var fragment = document.createDocumentFragment();
    var i = capacity.SELECT.options.length - currentValue.roomAmount || 0;

    for (; i < capacity.SELECT.options.length; i++) {
      fragment.appendChild(capacity.SELECT.options[i].cloneNode(true));
    }

    formCapacity.appendChild(fragment);
  };

  var onFormRoomAmountChange = function (evt) {
    var target = evt.target;

    currentValue.roomAmount = Number(target.value);
    setCurrentCapacityOptions();
  };


  /* Валидация ввода адреса */

  var onFormAddressInvalid = function () {
    if (formAddress.validity.valueMissing) {
      formAddress.setCustomValidity(validityMessage.EMPTY_FIELD);
      setErrorColorFormInput(formAddress);
    } else {
      formAddress.setCustomValidity('');
      setValidColorFormInput(formAddress);
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


  /* Основной код */

  price.setDefaultProperty();
  setMinFormPrice();

  capacity.getProperties();
  setCurrentCapacityOptions();

  addValidityEventsForm();
})();

