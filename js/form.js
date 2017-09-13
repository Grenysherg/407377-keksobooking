'use strict';

(function () {
  var domAvatarInput = document.querySelector('.notice__photo input[type="file"]');
  var domAvatarPreview = document.querySelector('.notice__photo img');

  var domForm = document.querySelector('.notice__form');
  var domTitleInput = domForm.querySelector('#title');
  var domTypeSelect = domForm.querySelector('#type');
  var domPriceInput = domForm.querySelector('#price');
  var domRoomSelect = domForm.querySelector('#room_number');
  var domCapacitySelect = domForm.querySelector('#capacity');
  var domAddressInput = domForm.querySelector('#address');
  var domTimeInSelect = domForm.querySelector('#timein');
  var domTimeOutSelect = domForm.querySelector('#timeout');

  var domPhoto = domForm.querySelector('.form__photo-container');
  var domPhotoInput = domPhoto.querySelector('input[type="file"]');
  var domPhotoPreviewTemplate = document.querySelector('#photo-template').content;

  var AVATAR_PREVIEW_DEFAULT_SRC = domAvatarPreview.getAttribute('src');

  var PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT = domPhoto.querySelectorAll('.form__photo').length;

  var IMG_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


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
    domAvatarInput.addEventListener('change', onAvatarInputChange);

    domTitleInput.addEventListener('input', onDomTitleInput);
    domTitleInput.addEventListener('invalid', onDomTitleInvalid);

    domTypeSelect.addEventListener('change', onDomTypeChange);

    domPriceInput.addEventListener('input', onDomPriceInput);
    domPriceInput.addEventListener('invalid', onDomPriceInvalid);

    domRoomSelect.addEventListener('change', onDomRoomChange);

    domTimeInSelect.addEventListener('change', onDomTimeInChange);
    domTimeOutSelect.addEventListener('change', onDomTimeOutChange);

    domPhotoInput.addEventListener('change', onPhotoInputChange);

    domForm.addEventListener('submit', onDomFormSubmit);
  };


  /* Загрузка аватара */

  var resetAvatarPreview = function () {
    domAvatarPreview.setAttribute('src', AVATAR_PREVIEW_DEFAULT_SRC);
  };

  var onAvatarInputChange = function () {
    var avatar = domAvatarInput.files[0];


    if (window.file.isRightType(avatar, IMG_FILE_TYPES)) {
      window.file.uploadImgPreview(avatar, domAvatarPreview);
    }
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


  window.synchronizeDomFields(domTypeSelect, domPriceInput, lodgeTypes, minPrices, setDomFieldMinNumber);


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


  setCapacityOptions();


  /* Адрес */


  var setAddressDefaultValue = function () {
    var mainPinPointerDefaultLocation = window.pin.getMainPointerDefaultLocation();

    domAddressInput.setAttribute('value', createLocationString(mainPinPointerDefaultLocation.X, mainPinPointerDefaultLocation.Y));
  };


  setAddressDefaultValue();


  /* Время заезда и выезда */


  var onDomTimeInChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);
  };

  var onDomTimeOutChange = function () {
    window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
        window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);
  };


  window.synchronizeDomFields(domTimeInSelect, domTimeOutSelect,
      window.data.advert.timeIn.VALUES, window.data.advert.timeOut.VALUES, setDomFieldValue);


  /* Загрузка фотографий */


  var resetPhotoPreviewContainers = function () {
    var domPhotoPreviewCompletedContainers = domPhoto.querySelectorAll('.form__photo:not(:empty)');

    Array.from(domPhotoPreviewCompletedContainers).forEach(function (it) {
      it.innerHTML = '';
    });
  };

  var renderPhotoPreviewContainer = function (isContainerEmpty) {
    var domElement = domPhotoPreviewTemplate.cloneNode(true);


    if (isContainerEmpty) {
      domElement.children[0].innerHTML = '';
    }


    return domElement;
  };

  var renderPhotoPreviewEmptyContainers = function (containersElementAmount) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < containersElementAmount; i++) {
      fragment.appendChild(renderPhotoPreviewContainer(true));
    }


    return fragment;
  };

  var removePhotoPreviewCompletedContainers = function () {
    var domPhotoPreviewCompletedContainers = domPhoto.querySelectorAll('.form__photo:not(:empty)');


    Array.from(domPhotoPreviewCompletedContainers).forEach(function (it) {
      domPhoto.removeChild(it);
    });
  };

  var addPhoto = function (addedPhotoAmount) {
    var fragment = document.createDocumentFragment();

    var photoPreviewContainersElementAmount = domPhoto.children.length - 1;
    var photoPreviewContainersFirstElementIndex = 1;

    var emptyContainersLength = domPhoto.querySelectorAll('.form__photo:empty').length;
    var newEmptyContainersLength = 0;


    if (addedPhotoAmount > emptyContainersLength) {
      newEmptyContainersLength = addedPhotoAmount - emptyContainersLength;

      fragment.appendChild(renderPhotoPreviewEmptyContainers(newEmptyContainersLength));
    }

    while (domPhoto.children[photoPreviewContainersFirstElementIndex].children.length
        && fragment.children.length - newEmptyContainersLength < photoPreviewContainersElementAmount - addedPhotoAmount) {
      fragment.appendChild(domPhoto.children[photoPreviewContainersFirstElementIndex]);
    }

    removePhotoPreviewCompletedContainers();

    var domNextNeighbour = addedPhotoAmount <= emptyContainersLength ? domPhoto.children[addedPhotoAmount + 1] : null;

    domPhoto.insertBefore(fragment, domNextNeighbour);
  };

  var removePhoto = function (domPhotoPreviewContainer) {
    var domNextNeighbour = domPhotoPreviewContainer.nextElementSibling;


    if (domNextNeighbour) {
      if (domNextNeighbour.children.length) {
        domPhoto.insertBefore(domPhoto.removeChild(domNextNeighbour), domPhotoPreviewContainer);

        removePhoto(domPhotoPreviewContainer);
      }
    }
  };

  var onCrossClick = function (evt) {
    var cross = evt.target;

    removePhoto(cross.parentNode);

    cross.parentNode.innerHTML = '';

    cross.removeEventListener('click', onCrossClick);
  };


  var onPhotoInputChange = function () {
    var domFiles = domPhotoInput.files;
    var imgFiles = [];


    Array.from(domFiles).forEach(function (it) {
      if (window.file.isRightType(it, IMG_FILE_TYPES)) {
        imgFiles.push(it);
      }
    });

    imgFiles = imgFiles.length < PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT
      ? imgFiles
      : imgFiles.slice(0, PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT);

    addPhoto(imgFiles.length);

    imgFiles.forEach(function (it) {
      var domPhotoPreviewContainer = renderPhotoPreviewContainer(false).children[0];


      domPhoto.replaceChild(domPhotoPreviewContainer, domPhoto.querySelector('.form__photo:empty'));

      domPhotoPreviewContainer.querySelector('.cross').addEventListener('click', onCrossClick);

      window.file.uploadImgPreview(it, domPhotoPreviewContainer.querySelector('img'));
    });

    domPhotoInput.value = '';
  };


  /* Отправка формы */


  var onDomFormSubmit = function (evt) {
    window.backend.save(
        'https://1510.dump.academy/keksobooking',
        new FormData(domForm),
        function () {
          domForm.reset();
          resetAvatarPreview();
          resetPhotoPreviewContainers();
          window.pin.resetMainPointerLocation();

          window.utility.showSystemMessage('Данные формы отправлены успешно', 'success');
        },
        function (errorMessage) {
          window.utility.showSystemMessage(errorMessage, 'error');
        });

    evt.preventDefault();
  };


  /* main */


  addFormEvents();


  window.form = {};

  window.form.setAddressValue = function (mainPinPointerLocationX, mainPinPointerLocationY) {
    domAddressInput.value = createLocationString(mainPinPointerLocationX, mainPinPointerLocationY);
  };
})();

