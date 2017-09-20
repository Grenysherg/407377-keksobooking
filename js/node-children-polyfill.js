'use strict';

(function () {
  var polyfill = function (prototype) {
    if (!('firstElementChild' in prototype)) {
      Object.defineProperty(prototype, 'firstElementChild', {
        get: function () {
          var nodes = this.childNodes;
          var length = nodes.length;
          var current;
          for (var i = 0; i < length; i++) {
            current = nodes[i];
            if (current.nodeType === 1) {
              return current;
            }
          }
          return null;
        }
      });
    }

    if (!('lastElementChild' in prototype)) {
      Object.defineProperty(prototype, 'lastElementChild', {
        get: function () {
          var nodes = this.childNodes;
          var length = nodes.length;
          var current;
          for (var i = length - 1; i > 0; i--) {
            current = nodes[i];
            if (current.nodeType === 1) {
              return current;
            }
          }
          return null;
        }
      });
    }

    if (!('childElementCount' in prototype)) {
      Object.defineProperty(prototype, 'childElementCount', {
        get: function () {
          var nodes = this.childNodes;
          var length = nodes.length;
          var count = 0;
          for (var i = 0; i < length; i++) {
            if (nodes[i].nodeType === 1) {
              count++;
            }
          }
          return count;
        }
      });
    }

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
