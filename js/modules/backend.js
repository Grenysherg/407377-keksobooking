'use strict';

(function () {
  var status = {};
  status['ok'] = 200;

  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';


  window.backend = {};

  window.backend.load = function (url, onSuccess, onError) {
    var onXhrLoad = function () {
      if (xhr.status === status['ok']) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var onXhrError = function () {
      onError('Произошла ошибка соединения');
    };

    var onXhrTimeout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend.save = function () {

  };
})();
