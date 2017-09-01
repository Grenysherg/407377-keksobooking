'use strict';

(function () {
  window.data = {};


  window.data.offerTitle = {};
  window.data.offerTitle.MIN_LENGTH = 30;
  window.data.offerTitle.MAX_LENGTH = 100;


  window.data.lodgeType = {};

  window.data.lodgeType.bungalo = {};
  window.data.lodgeType.bungalo.VALUE = 'Бунгало';
  window.data.lodgeType.bungalo.MIN_PRICE = 0;

  window.data.lodgeType.flat = {};
  window.data.lodgeType.flat.VALUE = 'Квартира';
  window.data.lodgeType.flat.MIN_PRICE = 1000;

  window.data.lodgeType.house = {};
  window.data.lodgeType.house.VALUE = 'Дом';
  window.data.lodgeType.house.MIN_PRICE = 5000;

  window.data.lodgeType.palace = {};
  window.data.lodgeType.palace.VALUE = 'Дворец';
  window.data.lodgeType.palace.MIN_PRICE = 10000;


  window.data.price = {};
  window.data.price.MAX = 1000000;


  window.data.roomAmount = {};
  window.data.roomAmount['1'] = '1 комната';
  window.data.roomAmount['2'] = '2 комнаты';
  window.data.roomAmount['3'] = '3 комнаты';
  window.data.roomAmount['100'] = '100 комнат';

  window.data.capacity = {};
  window.data.capacity.VALUES = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];


  window.data.timeIn = {};
  window.data.timeIn.VALUES = ['12:00', '13:00', '14:00'];

  window.data.timeOut = {};
  window.data.timeOut.VALUES = ['12:00', '13:00', '14:00'];
})();
