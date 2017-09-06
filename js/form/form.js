'use strict';

(function () {
  var domForm = document.querySelector('.notice__form');
  var titleInput = domForm.querySelector('#title');
  var lodgeTypeInput = domForm.querySelector('#type');
  var priceInput = domForm.querySelector('#price');
  var roomAmountInput = domForm.querySelector('#room_number');
  var capacityInput = domForm.querySelector('#capacity');
  var addressInput = domForm.querySelector('#address');
  var timeInInput = domForm.querySelector('#timein');
  var timeOutInput = domForm.querySelector('#timeout');

  var validationMessage = {};
  validationMessage.EMPTY_FIELD = 'Обязательное поле';


  /* utilities */


  var setInputValue = function (input, value) {
    input.value = value;
  };

  var setInputMinNumber = function (input, number) {
    input.min = number;
  };

  var setInputErrorColor = function (input) {
    input.style.borderColor = 'red';
  };

  var setInputValidColor = function (input) {
    input.style.borderColor = 'green';
  };

  var renderSelectOption = function (value, text) {
    var domElement = document.createElement('option');

    domElement.setAttribute('value', value);
    domElement.text = text;

    return domElement;
  };

  var addFormEvents = function () {
    titleInput.addEventListener('input', onTitleInput);
    titleInput.addEventListener('invalid', onTitleInvalid);

    lodgeTypeInput.addEventListener('change', onLodgeTypeChange);

    priceInput.addEventListener('input', onPriceInput);
    priceInput.addEventListener('invalid', onPriceInvalid);

    roomAmountInput.addEventListener('change', onRoomAmountChange);

    addressInput.addEventListener('invalid', onAddressInvalid);

    timeInInput.addEventListener('change', onTimeInChange);
    timeOutInput.addEventListener('change', onTimeOutChange);

    domForm.addEventListener('submit', onFormSubmit);
  };


  /* Название */


  var onTitleInput = function (evt) {
    var target = evt.target;

    if (target.value.length < window.data.advert.title.MIN_LENGTH) {
      titleInput.setCustomValidity('Минимально возможное количество символов: ' + window.data.advert.title.MIN_LENGTH);
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var onTitleInvalid = function () {
    if (!titleInput.validity.valid) {
      setInputErrorColor(titleInput);

      if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity('Максимально возможное количество символов: ' + window.data.advert.title.MAX_LENGTH);
      }
    } else {
      titleInput.setCustomValidity('');
      setInputValidColor(titleInput);
    }
  };


  /* Тип жилья и цена */


  var getLodgeTypes = function () {
    return Object.keys(window.data.advert.lodgeType);
  };

  var getMinPrices = function () {
    var array = [];
    var lodgeType = window.data.advert.lodgeType;

    for (var key in lodgeType) {
      if (lodgeType.hasOwnProperty(key)) {
        array.push(lodgeType[key].MIN_PRICE);
      }
    }

    return array;
  };

  var lodgeTypes = getLodgeTypes();
  var minPrices = getMinPrices();

  var onLodgeTypeChange = function () {
    window.synchronizeInputs(lodgeTypeInput, priceInput, lodgeTypes, minPrices, setInputMinNumber);
  };

  var onPriceInput = function () {
    if (priceInput.validity.valid) {
      priceInput.setCustomValidity('');
    }
  };

  var onPriceInvalid = function () {
    if (!priceInput.validity.valid) {
      var currentMinPrice = Number(priceInput.getAttribute('min'));
      var minPricesElementIndex = minPrices.indexOf(currentMinPrice);

      setInputErrorColor(priceInput);

      if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      } else if (priceInput.validity.rangeUnderflow) {
        var lodgeTypesElement = lodgeTypes[minPricesElementIndex];
        var lodgeTypeValue = window.data.advert.lodgeType[lodgeTypesElement].VALUE;

        priceInput.setCustomValidity('Для типа жилья "' + lodgeTypeValue + '" минимально возможная цена: ' + currentMinPrice);
      } else if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity('Максимально возможная цена: ' + window.data.advert.price.MAX);
      }
    } else {
      priceInput.setCustomValidity('');
      setInputValidColor(priceInput);
    }
  };


  /* Количество комнат и гостей */


  var setCapacityOptions = function () {
    var rooms = Object.keys(window.data.advert.room);
    var fragment = document.createDocumentFragment();

    capacityInput.options.length = 0;

    if (roomAmountInput.value === rooms[rooms.length - 1]) {
      fragment.appendChild(renderSelectOption('0', window.data.advert.capacity.VALUES[0]));
    } else {
      for (var i = rooms.indexOf(roomAmountInput.value); i >= 0; i--) {
        fragment.appendChild(renderSelectOption(String(i + 1), window.data.advert.capacity.VALUES[i + 1]));
      }
    }

    capacityInput.appendChild(fragment);
  };

  var onRoomAmountChange = function () {
    setCapacityOptions();
  };


  /* Адрес */


  var onAddressInvalid = function () {
    if (addressInput.validity.valueMissing) {
      addressInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      setInputErrorColor(addressInput);
    } else {
      addressInput.setCustomValidity('');
      setInputValidColor(addressInput);
    }
  };


  /* Время заезда и выезда */


  var onTimeInChange = function () {
    window.synchronizeInputs(timeInInput, timeOutInput,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);
  };

  var onTimeOutChange = function () {
    window.synchronizeInputs(timeInInput, timeOutInput,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);
  };


  /* Отправка формы */


  var onFormSubmit = function (evt) {
    window.backend.save(
        domForm.getAttribute('action'),
        new FormData(domForm),
        function () {
          domForm.reset();

          window.utility.showSystemMessage('Данные формы отправлены успешно', 'success');
        },
        function () {
          window.utility.showSystemMessage('Произошла ошибка при отправке формы', 'error');
        });

    evt.preventDefault();
  };


  /* main */


  window.synchronizeInputs(lodgeTypeInput, priceInput, lodgeTypes, minPrices, setInputMinNumber);

  setCapacityOptions();

  window.synchronizeInputs(timeInInput, timeOutInput,
      window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);

  addFormEvents();
})();

