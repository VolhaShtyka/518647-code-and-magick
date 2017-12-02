'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  window.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var WIZARDS_COUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizards = function (wizardsCount) {
    var wizards = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizards[i] = {
        name: window.randomValue(FIRST_NAMES) + ' ' + window.randomValue(LAST_NAMES),
        coatColor: window.randomValue(window.COAT_COLORS),
        eyesColor: window.randomValue(window.EYES_COLORS)
      };
    }
    return wizards;
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
})();
