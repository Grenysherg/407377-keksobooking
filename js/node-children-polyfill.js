'use strict';

(function (constructor) {
  if (constructor &&
    constructor.prototype &&
    constructor.prototype.children === null) {
    Object.defineProperty(constructor.prototype, 'children', {
      get: function () {
        var i = 0;
        var nodes = this.childNodes;
        var node = nodes[i++];
        var children = [];

        while (node) {
          if (node.nodeType === 1) {
            children.push(node);
          }

          node = nodes[i++];
        }

        return children;
      }
    });
  }
})(window.Node || window.Element);
