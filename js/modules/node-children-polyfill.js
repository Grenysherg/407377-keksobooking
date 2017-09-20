'use strict';

(function (constructor) {
  if (constructor &&
    constructor.prototype &&
    constructor.prototype.children === null) {
    Object.defineProperty(constructor.prototype, 'children', {
      get: function () {
        var i = 0;
        var node = this.childNodes;
        var nodes = this.childNodes;
        var children = [];

        while (node = nodes[i++]) {
          if (node.nodeType === 1) {
            children.push(node);
          }
        }

        return children;
      }
    });
  }
})(window.Node || window.Element);
