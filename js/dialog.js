'use strict';

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.overlay.setup');
  var userDialogOpen = document.querySelector('.setup-open-icon');
  var userDialogClose = document.querySelector('.setup-close');
  var userDialogWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireball = document.querySelector('.setup-fireball-wrap');

  var dialogEscPressHandler = function (evt) {
    if (evt.target.nodeName !== 'INPUT') {
      window.util.isEscapePressed(evt, closeUserDialog);
    }
  };

  var dialogEnterPressHandler = function (evt) {
    window.util.isEnterPressed(evt, openUserDialog);
  };

  var coatElementClickHandler = function () {
    userDialogWizardCoat.style.fill = window.randomValue(window.COAT_COLORS);
  };

  var eyesElementClickHandler = function () {
    userDialogWizardEyes.style.fill = window.randomValue(window.EYES_COLORS);
  };

  var fireballElementClickHandler = function () {
    userDialogWizardFireball.style.background = window.randomValue(FIREBALL_COLORS);
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscPressHandler);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', dialogEscPressHandler);
  };

  userDialogOpen.addEventListener('click', openUserDialog);
  userDialogOpen.addEventListener('keydown', dialogEnterPressHandler);
  userDialogClose.addEventListener('click', closeUserDialog);
  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterPressed(evt, closeUserDialog);
  });
  userDialog.addEventListener('keydown', dialogEscPressHandler);
  userDialogWizardCoat.addEventListener('click', coatElementClickHandler);
  userDialogWizardEyes.addEventListener('click', eyesElementClickHandler);
  userDialogWizardFireball.addEventListener('click', fireballElementClickHandler);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();
