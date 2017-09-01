'use strict';

(function () {
  var formDomElement = document.querySelector('.notice__form');

  window.formData = {};

  window.formData.field = {};
  window.formData.field.title = formDomElement.querySelector('#title');
  window.formData.field.type = formDomElement.querySelector('#type');
  window.formData.field.price = formDomElement.querySelector('#price');
  window.formData.field.roomAmount = formDomElement.querySelector('#room_number');
  window.formData.field.capacity = formDomElement.querySelector('#capacity');
  window.formData.field.address = formDomElement.querySelector('#address');
  window.formData.field.timeIn = formDomElement.querySelector('#timein');
  window.formData.field.timeOut = formDomElement.querySelector('#timeout');

  window.formData.validationMessage = {};
  window.formData.validationMessage.EMPTY_FIELD = 'Обязательное поле';
})();
