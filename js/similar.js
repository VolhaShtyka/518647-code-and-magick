'use strict';

(function () {
  var coatColor = document.querySelector('.setup-wizard .wizard-coat').style.fill;
  var eyesColor = document.querySelector('.setup-wizard .wizard-eyes').style.fill;

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.similar.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.similar.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var sortWizardsByPopular = function () {
    window.setup.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.setup.wizards.indexOf(left) - window.setup.wizards.indexOf(right);
      }
      return rankDiff;
    });
  };

  window.similar = {
    coatColor: coatColor,
    eyesColor: eyesColor,
    updateSimilarWizardsHandler: function () {
      sortWizardsByPopular();
      window.setup.renderSimilarWizards();
    }
  };

})();
