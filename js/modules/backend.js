'use strict';

(function () {
  var status = {};
  status['ok'] = 200;


  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 1000;

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

    return xhr;
  };


  window.backend = {};

  window.backend.load = function (url, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend.save = function (url, data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
