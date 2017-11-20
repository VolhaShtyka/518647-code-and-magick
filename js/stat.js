'use strict';

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);


  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'blue';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 150, 30);
  ctx.fillText('Список результатов:', 180, 50);


  var histogramHeight = 150;

  var step = histogramHeight / (getMaxElement(times) - 0);

  var barWidth = 40;
  var indent = 50;
  var initialX = 160;
  var initialY = 80;

  for (var i = 0; i < times.length; i++) {

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      var grd = ctx.createLinearGradient(300, 200, 300, 10);
      grd.addColorStop(0, 'blue');
      grd.addColorStop(1, 'white');

      ctx.fillStyle = grd;
    }

    ctx.fillRect(initialX + (barWidth + indent) * i, (histogramHeight - times[i] * step) + initialY, barWidth, times[i] * step);
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, histogramHeight + 100);
    ctx.fillText(Math.floor(times[i]), initialX + (barWidth + indent) * i, (histogramHeight - times[i] * step) + initialY - 5);
  }
};

var getMaxElement = function (arr) {
  var maxItem = -1;

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (item > maxItem) {
      maxItem = item;
    }
  }
  return maxItem;
};
