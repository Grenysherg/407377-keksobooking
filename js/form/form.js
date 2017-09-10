'use strict';

(function () {
  var domForm = document.querySelector('.notice__form');
  var domTitleInput = domForm.querySelector('#title');
  var domTypeSelect = domForm.querySelector('#type');
  var domPriceInput = domForm.querySelector('#price');
  var domRoomSelect = domForm.querySelector('#room_number');
  var domCapacitySelect = domForm.querySelector('#capacity');
  var domAddressInput = domForm.querySelector('#address');
  var domTimeInSelect = domForm.querySelector('#timein');
  var domTimeOutSelect = domForm.querySelector('#timeout');

  var validationMessage = {};
  validationMessage.EMPTY_FIELD = 'Обязательное поле';


  var createLocationString = function (coordinateXValue, coordinateYValue) {
    return 'x: ' + coordinateXValue + ', y: ' + coordinateYValue;
  };

  var setInputValue = function (input, value) {
    input.value = value;
  };

  var setInputMinNumber = function (input, number) {
    input.min = number;
  };

  var setDomFieldErrorColor = function (input) {
    input.style.borderColor = 'red';
  };

  var setDomFieldValidColor = function (input) {
    input.style.borderColor = '#d9d9d3';
  };

  var renderSelectOption = function (value, text) {
    var domElement = document.createElement('option');

    domElement.setAttribute('value', value);
    domElement.text = text;

    return domElement;
  };

  var addFormEvents = function () {
    domTitleInput.addEventListener('input', onDomTitleInput);
    domTitleInput.addEventListener('invalid', onDomTitleInvalid);

    domTypeSelect.addEventListener('change', onDomTypeChange);

    domPriceInput.addEventListener('input', onDomPriceInput);
    domPriceInput.addEventListener('invalid', onDomPriceInvalid);

    domRoomSelect.addEventListener('change', onDomRoomChange);

    domAddressInput.addEventListener('invalid', onDomAddressInvalid);

    domTimeInSelect.addEventListener('change', onDomTimeInChange);
    domTimeOutSelect.addEventListener('change', onDomTimeOutChange);

    domForm.addEventListener('submit', onDomFormSubmit);
  };


  /* Название */


  var onDomTitleInput = function (evt) {
    var target = evt.target;

    if (target.value.length < window.data.advert.title.MIN_LENGTH) {
      domTitleInput.setCustomValidity('Минимально возможное количество символов: ' + window.data.advert.title.MIN_LENGTH);
    } else {
      domTitleInput.setCustomValidity('');
    }
  };

  var onDomTitleInvalid = function () {
    if (!domTitleInput.validity.valid) {
      setDomFieldErrorColor(domTitleInput);

      if (domTitleInput.validity.valueMissing) {
        domTitleInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      } else if (domTitleInput.validity.tooLong) {
        domTitleInput.setCustomValidity('Максимально возможное количество символов: ' + window.data.advert.title.MAX_LENGTH);
      }
    } else {
      domTitleInput.setCustomValidity('');
      setDomFieldValidColor(domTitleInput);
    }
  };


  /* Тип жилья и цена */


  var getTypes = function () {
    return Object.keys(window.data.advert.type);
  };

  var getMinPrices = function () {
    var array = [];
    var type = window.data.advert.type;

    for (var key in type) {
      if (type.hasOwnProperty(key)) {
        array.push(type[key].MIN_PRICE);
      }
    }

    return array;
  };

  var lodgeTypes = getTypes();
  var minPrices = getMinPrices();

  var onDomTypeChange = function () {
    window.synchronizeDomFields(domTypeSelect, domPriceInput, lodgeTypes, minPrices, setInputMinNumber);
  };

  var onDomPriceInput = function (evt) {
    var target = evt.target;

    var currentMinPrice = Number(domPriceInput.getAttribute('min'));
    var lodgeTypeValue = window.data.advert.type[lodgeTypes[minPrices.indexOf(currentMinPrice)]].VALUE;

    if (Number(target.value) < currentMinPrice) {
      domPriceInput.setCustomValidity('Для типа жилья "' + lodgeTypeValue + '" минимально возможная цена: ' + currentMinPrice);
    } else if (Number(target.value) > window.data.advert.price.MAX) {
      domPriceInput.setCustomValidity('Максимально возможная цена: ' + window.data.advert.price.MAX);
    } else {
      setDomFieldValidColor(domPriceInput);
      domPriceInput.setCustomValidity('');
    }
  };

  var onDomPriceInvalid = function () {
    if (!domPriceInput.validity.valid) {
      setDomFieldErrorColor(domPriceInput);

      if (domPriceInput.validity.valueMissing) {
        domPriceInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      }
    } else {
      setDomFieldValidColor(domPriceInput);
      domPriceInput.setCustomValidity('');
    }
  };


  /* Количество комнат и гостей */


  var setCapacityOptions = function () {
    var rooms = Object.keys(window.data.advert.room);
    var fragment = document.createDocumentFragment();

    domCapacitySelect.options.length = 0;

    if (domRoomSelect.value === rooms[rooms.length - 1]) {
      fragment.appendChild(renderSelectOption('0', window.data.advert.capacity.VALUES[0]));
    } else {
      for (var i = rooms.indexOf(domRoomSelect.value); i >= 0; i--) {
        fragment.appendChild(renderSelectOption(String(i + 1), window.data.advert.capacity.VALUES[i + 1]));
      }
    }

    domCapacitySelect.appendChild(fragment);
  };

  var onDomRoomChange = function () {
    setCapacityOptions();
  };


  /* Адрес */


  var onDomAddressInvalid = function () {
    if (domAddressInput.validity.valueMissing) {
      domAddressInput.setCustomValidity(validationMessage.EMPTY_FIELD);
      setDomFieldErrorColor(domAddressInput);
    } else {
      domAddressInput.setCustomValidity('');
      setDomFieldValidColor(domAddressInput);
    }
  };

  var setAddressDefaultValue = function () {
    var mainPinPointerDefaultLocation = window.mapPin.getMainPointerDefaultLocation();

    domAddressInput.setAttribute('value', createLocationString(mainPinPointerDefaultLocation.X, mainPinPointerDefaultLocation.Y));
  };


  /* Время заезда и выезда */


  var onDomTimeInChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);
  };

  var onDomTimeOutChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);
  };


  /* Отправка формы */


  var onDomFormSubmit = function (evt) {
    window.backend.save(
        'https://1510.dump.academy/keksobooking',
        new FormData(domForm),
        function () {
          domForm.reset();
          window.mapPin.resetMainPointerLocation();

          window.utility.showSystemMessage('Данные формы отправлены успешно', 'success');
        },
        function () {
          window.utility.showSystemMessage('Произошла ошибка при отправке формы', 'error');
        });

    evt.preventDefault();
  };


  /* main */


  window.synchronizeDomFields(domTypeSelect, domPriceInput, lodgeTypes, minPrices, setInputMinNumber);

  setCapacityOptions();

  window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
      window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setInputValue);

  setAddressDefaultValue();

  addFormEvents();


  window.form = {};

  window.form.setAddressValue = function (mainPinPointerLocationX, mainPinPointerLocationY) {
    domAddressInput.value = createLocationString(mainPinPointerLocationX, mainPinPointerLocationY);
  };
})();

