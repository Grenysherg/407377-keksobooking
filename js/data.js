'use strict';

(function () {
  window.data = {};



  window.data.sign = {};
  window.data.sign.RUBLE = String.fromCharCode(8381);



  window.data.advert = {};

  window.data.advert.title = {};
  window.data.advert.title.MIN_LENGTH = 30;
  window.data.advert.title.MAX_LENGTH = 100;


  window.data.advert.lodgeType = {};

  window.data.advert.lodgeType.bungalo = {};
  window.data.advert.lodgeType.bungalo.VALUE = 'Бунгало';
  window.data.advert.lodgeType.bungalo.MIN_PRICE = 0;

  window.data.advert.lodgeType.flat = {};
  window.data.advert.lodgeType.flat.VALUE = 'Квартира';
  window.data.advert.lodgeType.flat.MIN_PRICE = 1000;

  window.data.advert.lodgeType.house = {};
  window.data.advert.lodgeType.house.VALUE = 'Дом';
  window.data.advert.lodgeType.house.MIN_PRICE = 5000;

  window.data.advert.lodgeType.palace = {};
  window.data.advert.lodgeType.palace.VALUE = 'Дворец';
  window.data.advert.lodgeType.palace.MIN_PRICE = 10000;


  window.data.advert.price = {};
  window.data.advert.price.MAX = 1000000;


  window.data.advert.room = {};
  window.data.advert.room['1'] = '1 комната';
  window.data.advert.room['2'] = '2 комнаты';
  window.data.advert.room['3'] = '3 комнаты';
  window.data.advert.room['100'] = '100 комнат';

  window.data.advert.capacity = {};
  window.data.advert.capacity.VALUES = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];


  window.data.advert.timeIn = {};
  window.data.advert.timeIn.VALUES = ['12:00', '13:00', '14:00'];

  window.data.advert.timeOut = {};
  window.data.advert.timeOut.VALUES = ['12:00', '13:00', '14:00'];
})();
