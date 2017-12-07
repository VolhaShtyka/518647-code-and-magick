'use strict';

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.overlay.setup');
  var userDialogOpen = document.querySelector('.setup-open-icon');
  var userDialogClose = document.querySelector('.setup-close');
  var userDialogMoving = document.querySelector('.setup-user-pic');
  var userDialogWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireball = document.querySelector('.setup-fireball-wrap');

  userDialogMoving.style.zIndex = 1;
  userDialog.draggable = true;

  var dialogMovingHandler = function (evt) {
    evt.preventDefault();
    userDialog.style.top = evt.clientY + 'px';
    userDialog.style.left = evt.clientX + userDialog.offsetWidth / 2 + 'px';
  };

  var dialogMovingUpHandler = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', dialogMovingHandler);
    document.removeEventListener('mouseup', dialogMovingUpHandler);
  };

  var dialogMovingDownHandler = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', dialogMovingHandler);
    document.addEventListener('mouseup', dialogMovingUpHandler);
  };

  var dialogEscPressHandler = function (evt) {
    if (evt.target.nodeName !== 'INPUT') {
      window.util.isEscapePressed(evt, closeUserDialog);
    }
  };

  var dialogEnterPressHandler = function (evt) {
    window.util.isEnterPressed(evt, openUserDialog);
  };

  var coatElementClickHandler = function () {
    userDialogWizardCoat.style.fill = window.util.getRandomValue(window.setup.COAT_COLORS);
  };

  var eyesElementClickHandler = function () {
    userDialogWizardEyes.style.fill = window.util.getRandomValue(window.setup.EYES_COLORS);
  };

  var fireballElementClickHandler = function () {
    userDialogWizardFireball.style.background = window.util.getRandomValue(FIREBALL_COLORS);
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscPressHandler);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    userDialog.style.top = '';
    userDialog.style.left = '';
    document.removeEventListener('keydown', dialogEscPressHandler);
  };

  userDialogOpen.addEventListener('click', openUserDialog);
  userDialogOpen.addEventListener('keydown', dialogEnterPressHandler);
  userDialogClose.addEventListener('click', closeUserDialog);
  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterPressed(evt, closeUserDialog);
  });
  userDialog.addEventListener('keydown', dialogEscPressHandler);
  userDialogMoving.addEventListener('mousedown', dialogMovingDownHandler);
  userDialogWizardCoat.addEventListener('click', coatElementClickHandler);
  userDialogWizardEyes.addEventListener('click', eyesElementClickHandler);
  userDialogWizardFireball.addEventListener('click', fireballElementClickHandler);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();
