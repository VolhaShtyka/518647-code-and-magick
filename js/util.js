'use strict';

(function () {
  window.randomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
})();

(function () {
  window.getMaxElement = function (arr) {
    var maxItem = -1;

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item > maxItem) {
        maxItem = item;
      }
    }
    return maxItem;
  };
})();

(function () {

  var KEY_CODE_ESCAPE = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    isEscapePressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        action();
      }
    },
    isEnterPressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    }
  };
})();
