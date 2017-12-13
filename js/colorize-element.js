'use strict';

(function () {
  window.colorizeElement = function (element, colors, action) {
    var color = window.util.getRandomValue(colors);
    action(element, color);
    return color;
  };
})();
