'use strict';

(function () {
  window.file = {};

  window.file.isRightType = function (file, fileTypes) {
    return fileTypes.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  window.file.uploadImgPreview = function (file, domFileImgPreview) {
    var reader = new FileReader();


    var onReaderLoad = function () {
      domFileImgPreview.setAttribute('src', reader.result);

      reader.removeEventListener('load', onReaderLoad);
    };


    reader.addEventListener('load', onReaderLoad);
    reader.readAsDataURL(file);
  };
})();
