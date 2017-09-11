'use strict';

(function () {
  window.data = {};

  window.data.sign = {};
  window.data.sign.RUBLE = String.fromCharCode(8381);

  window.data.advert = {};

  window.data.advert.title = {};
  window.data.advert.title.MIN_LENGTH = 30;
  window.data.advert.title.MAX_LENGTH = 100;

  window.data.advert.type = {};

  window.data.advert.type.bungalo = {};
  window.data.advert.type.bungalo.ENG_VALUE = 'bungalo';
  window.data.advert.type.bungalo.RUS_VALUE = 'Бунгало';
  window.data.advert.type.bungalo.MIN_PRICE = 0;

  window.data.advert.type.flat = {};
  window.data.advert.type.flat.ENG_VALUE = 'bungalo';
  window.data.advert.type.flat.RUS_VALUE = 'Квартира';
  window.data.advert.type.flat.MIN_PRICE = 1000;

  window.data.advert.type.house = {};
  window.data.advert.type.house.ENG_VALUE = 'bungalo';
  window.data.advert.type.house.RUS_VALUE = 'Дом';
  window.data.advert.type.house.MIN_PRICE = 5000;

  window.data.advert.type.palace = {};
  window.data.advert.type.palace.ENG_VALUE = 'bungalo';
  window.data.advert.type.palace.RUS_VALUE = 'Дворец';
  window.data.advert.type.palace.MIN_PRICE = 10000;

  window.data.advert.price = {};
  window.data.advert.price.MAX = 1000000;

  window.data.advert.room = {};
  window.data.advert.room['1'] = '1 комната';
  window.data.advert.room['2'] = '2 комнаты';
  window.data.advert.room['3'] = '3 комнаты';
  window.data.advert.room['100'] = '100 комнат';

  window.data.advert.capacity = {};
  window.data.advert.capacity.VALUES = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
  window.data.advert.capacity.EMPTY_ELEMENT_INDEX = 0;

  window.data.advert.timeIn = {};
  window.data.advert.timeIn.VALUES = ['12:00', '13:00', '14:00'];

  window.data.advert.timeOut = {};
  window.data.advert.timeOut.VALUES = ['12:00', '13:00', '14:00'];

  window.data.advert.previewPhoto = {};
  window.data.advert.previewPhoto.ALT = 'Lodge photo';
  window.data.advert.previewPhoto.WIDTH = 52;
  window.data.advert.previewPhoto.HEIGHT = 42;

  window.data.advert.address = {};
  window.data.advert.address.x = {};
  window.data.advert.address.x.MIN = 300;
  window.data.advert.address.x.MAX = 1167;

  window.data.advert.address.y = {};
  window.data.advert.address.y.MIN = 200;
  window.data.advert.address.y.MAX = 650;
})();
