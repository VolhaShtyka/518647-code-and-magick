'use strict';

(function () {

  var COLOR_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COLOR_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var COLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.overlay.setup');
  var userDialogOpen = document.querySelector('.setup-open-icon');
  var userDialogClose = document.querySelector('.setup-close');
  var userDialogMoving = document.querySelector('.setup-user-pic');
  var userDialogWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireball = document.querySelector('.setup-fireball-wrap');
  var userDialogForm = userDialog.querySelector('.setup-wizard-form');

  userDialogMoving.style.zIndex = 1;
  userDialog.draggable = true;

  var offsetY;
  var offsetX;

  var dialogMovingHandler = function (evt) {
    evt.preventDefault();
    userDialog.style.top = evt.clientY + offsetY + 'px';
    userDialog.style.left = evt.clientX + offsetX + 'px';
  };

  var dialogMovingUpHandler = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', dialogMovingHandler);
    document.removeEventListener('mouseup', dialogMovingUpHandler);
  };

  var dialogMovingDownHandler = function (evt) {
    evt.preventDefault();
    offsetY = userDialog.offsetTop - userDialog.getBoundingClientRect().top - evt.offsetY;
    offsetX = userDialog.offsetLeft - userDialog.getBoundingClientRect().left - evt.offsetX;
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
    window.similar.coatColor = window.colorizeElement(userDialogWizardCoat, COLOR_COAT, fillElement);
    window.debounce(window.similar.updateSimilarWizardsHandler);
  };

  var eyesElementClickHandler = function () {
    window.similar.eyes = window.colorizeElement(userDialogWizardEyes, COLOR_EYES, fillElement);
    window.debounce(window.similar.updateSimilarWizardsHandler);
  };

  var fireballElementClickHandler = function () {
    window.colorizeElement(userDialogWizardFireball, COLOR_FIREBALL, changeElementBackground);
  };

  var loadHandler = function () {
    userDialog.classList.add('hidden');
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(userDialogForm), loadHandler, window.setup.errorHandler);
    evt.preventDefault();
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
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
  userDialogForm.addEventListener('submit', formSubmitHandler);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.dialog = {
    userDialogWizardCoat: userDialogWizardCoat,
    userDialogWizardEyes: userDialogWizardEyes
  };

})();
