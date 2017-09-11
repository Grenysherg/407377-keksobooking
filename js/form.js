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


  var createLocationString = function (coordinateXValue, coordinateYValue) {
    return 'x: ' + coordinateXValue + ', y: ' + coordinateYValue;
  };

  var setDomFieldValue = function (domField, value) {
    domField.value = value;
  };

  var setDomFieldMinNumber = function (domField, number) {
    domField.min = number;
  };

  var setDomFieldErrorColor = function (domField) {
    domField.style.borderColor = 'red';
  };

  var setDomFieldValidColor = function (domField) {
    domField.style.borderColor = '#d9d9d3';
  };

  var renderSelectOption = function (value, text) {
    var domElement = document.createElement('option');


    domElement.setAttribute('value', value);
    domElement.text = text;


    return domElement;
  };

  var onDomFieldInvalid = function (domField) {
    if (!domField.validity.valid) {
      setDomFieldErrorColor(domField);

      if (domField.validity.valueMissing) {
        domField.setCustomValidity('Обязательное поле');
      }
    } else {
      setDomFieldValidColor(domField);
      domField.setCustomValidity('');
    }
  };

  var addFormEvents = function () {
    domTitleInput.addEventListener('input', onDomTitleInput);
    domTitleInput.addEventListener('invalid', onDomTitleInvalid);

    domTypeSelect.addEventListener('change', onDomTypeChange);

    domPriceInput.addEventListener('input', onDomPriceInput);
    domPriceInput.addEventListener('invalid', onDomPriceInvalid);

    domRoomSelect.addEventListener('change', onDomRoomChange);

    domTimeInSelect.addEventListener('change', onDomTimeInChange);
    domTimeOutSelect.addEventListener('change', onDomTimeOutChange);

    domForm.addEventListener('submit', onDomFormSubmit);
  };


  /* Название */


  var onDomTitleInput = function (evt) {
    var target = evt.target;

    if (target.value.length < window.data.advert.title.MIN_LENGTH) {
      domTitleInput.setCustomValidity('Минимально возможное количество символов: ' + window.data.advert.title.MIN_LENGTH);
    } else if (target.value.length > window.data.advert.title.MAX_LENGTH) {
      domTitleInput.setCustomValidity('Максимально возможное количество символов: ' + window.data.advert.title.MAX_LENGTH);
    } else {
      setDomFieldValidColor(domTitleInput);
      domTitleInput.setCustomValidity('');
    }
  };

  var onDomTitleInvalid = function () {
    onDomFieldInvalid(domTitleInput);
  };


  /* Тип жилья и цена */

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


  var lodgeTypes = Object.keys(window.data.advert.type);
  var minPrices = getMinPrices();


  var onDomTypeChange = function () {
    window.synchronizeDomFields(domTypeSelect, domPriceInput, lodgeTypes, minPrices, setDomFieldMinNumber);
  };

  var onDomPriceInput = function (evt) {
    var target = evt.target;

    var currentMinPrice = Number(domPriceInput.getAttribute('min'));
    var lodgeTypeValue = window.data.advert.type[lodgeTypes[minPrices.indexOf(currentMinPrice)]].RUS_VALUE;


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
    onDomFieldInvalid(domPriceInput);
  };


  /* Количество комнат и гостей */


  var setCapacityOptions = function () {
    var rooms = Object.keys(window.data.advert.room);
    var fragment = document.createDocumentFragment();


    domCapacitySelect.options.length = 0;

    if (domRoomSelect.value === rooms[rooms.length - 1]) {
      fragment.appendChild(renderSelectOption(String(window.data.advert.capacity.EMPTY_ELEMENT_INDEX),
          window.data.advert.capacity.VALUES[window.data.advert.capacity.EMPTY_ELEMENT_INDEX]));
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


  var setAddressDefaultValue = function () {
    var mainPinPointerDefaultLocation = window.pin.getMainPointerDefaultLocation();

    domAddressInput.setAttribute('value', createLocationString(mainPinPointerDefaultLocation.X, mainPinPointerDefaultLocation.Y));
  };


  /* Время заезда и выезда */


  var onDomTimeInChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);
  };

  var onDomTimeOutChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);
  };


  /* Отправка формы */


  var onDomFormSubmit = function (evt) {
    window.backend.save(
        'https://1510.dump.academy/keksobooking',
        new FormData(domForm),
        function () {
          domForm.reset();
          window.pin.resetMainPointerLocation();

          window.utility.showSystemMessage('Данные формы отправлены успешно', 'success');
        },
        function (errorMessage) {
          window.utility.showSystemMessage(errorMessage, 'error');
        });

    evt.preventDefault();
  };


  /* main */


  window.synchronizeDomFields(domTypeSelect, domPriceInput, lodgeTypes, minPrices, setDomFieldMinNumber);

  setCapacityOptions();

  window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
      window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);

  setAddressDefaultValue();

  addFormEvents();


  window.form = {};

  window.form.setAddressValue = function (mainPinPointerLocationX, mainPinPointerLocationY) {
    domAddressInput.value = createLocationString(mainPinPointerLocationX, mainPinPointerLocationY);
  };
})();

