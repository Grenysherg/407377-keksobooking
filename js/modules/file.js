'use strict';

(function () {
  var IMG_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  window.file = {};

  window.file.isRightType = function (file, fileSortString) {
    switch (fileSortString) {
      case 'img':
        return IMG_FILE_TYPES.some(function (it) {
          return file.name.toLowerCase().endsWith(it);
        });
    }


    return false;
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
