/* Полифилл для работы Node.children в браузере Edge */

'use strict';

(function () {
  var polyfill = function (prototype) {
    if (!('children' in prototype)) {
      Object.defineProperty(prototype, 'children', {
        get: function () {
          var nodes = this.childNodes;
          var length = nodes.length;
          var children = [];
          var current;

          for (var i = 0; i < length; i++) {
            current = nodes[i];
            if (current.nodeType === 1) {
              children.push(current);
            }
          }

          return children;
        }
      });
    }
  };

  polyfill(Element.prototype);
  polyfill(Document.prototype);
  polyfill(DocumentFragment.prototype);
})();
