'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_COUNT = 4;

var KEY_CODE_ESCAPE = 27;

var KEY_CODE_ENTER = 13;

var userDialog = document.querySelector('.overlay.setup');
var userDialogOpen = document.querySelector('.setup-open-icon');
var userDialogClose = document.querySelector('.setup-close');
var userDialogWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var userDialogWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var userDialogWizardFireball = document.querySelector('.setup-fireball-wrap');

var dialogEscPressHandler = function (evt) {
  if (evt.keyCode === KEY_CODE_ESCAPE && evt.target.nodeName !== 'INPUT') {
    closeUserDialog();
  }
};

var dialogEnterPressHandler = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    openUserDialog();
  }
};

var coatElementClickHandler = function () {
  userDialogWizardCoat.style.fill = randomValue(COAT_COLORS);
};

var eyesElementClickHandler = function () {
  userDialogWizardEyes.style.fill = randomValue(EYES_COLORS);
};

var fireballElementClickHandler = function () {
  userDialogWizardFireball.style.background = randomValue(FIREBALL_COLORS);
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
  if (evt.keyCode === KEY_CODE_ENTER) {
    closeUserDialog();
  }
});
userDialog.addEventListener('keydown', dialogEscPressHandler);
userDialogWizardCoat.addEventListener('click', coatElementClickHandler);
userDialogWizardEyes.addEventListener('click', eyesElementClickHandler);
userDialogWizardFireball.addEventListener('click', fireballElementClickHandler);

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var createWizards = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = {
      name: randomValue(FIRST_NAMES) + ' ' + randomValue(LAST_NAMES),
      coatColor: randomValue(COAT_COLORS),
      eyesColor: randomValue(EYES_COLORS)
    };
  }
  return wizards;
};

var randomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards(createWizards(WIZARDS_COUNT));

userDialog.querySelector('.setup-similar').classList.remove('hidden');
