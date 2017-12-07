'use strict';

(function () {

  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var WIZARDS_COUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var shopElement = document.querySelector('.setup-artifacts-shop');

  var artifactsElement = document.querySelector('.setup-artifacts');

  var shopElementCell = artifactsElement.querySelectorAll('.setup-artifacts-cell');

  var artifact = null;

  shopElement.draggable = true;

  var currentCell;

  var setBorderCell = function (shouldBorder) {
    if (shouldBorder) {
      var i;
      for (i = 0; i < shopElementCell.length; i++) {
        shopElementCell[i].style.border = '2px dashed red';
      }
    } else {
      for (i = 0; i < shopElementCell.length; i++) {
        shopElementCell[i].style.border = '';
      }
    }
  };

  var setCurrentCellBackground = function (color) {
    currentCell.style.backgroundColor = color;
  };

  var artifactDragStartHandler = function (evt) {
    if (evt.target.tagName === 'IMG') {
      artifact = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      setBorderCell(true);
    }
  };

  var artifactDragOverHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var artifactDragDropHandler = function (evt) {
    setBorderCell(false);
    currentCell = evt.target;
    setCurrentCellBackground('');
    if (currentCell.tagName !== 'IMG') {
      currentCell.appendChild(artifact.cloneNode(true));
    }
    evt.preventDefault();
  };

  var artifactDragEnterHandler = function (evt) {
    currentCell = evt.target;
    setCurrentCellBackground('yellow');
    evt.preventDefault();
  };

  var artifactDragLeaveHandler = function (evt) {
    currentCell = evt.target;
    setCurrentCellBackground('');
    evt.preventDefault();
  };

  shopElement.addEventListener('dragstart', artifactDragStartHandler);
  artifactsElement.addEventListener('dragover', artifactDragOverHandler);
  artifactsElement.addEventListener('drop', artifactDragDropHandler);
  artifactsElement.addEventListener('dragenter', artifactDragEnterHandler);
  artifactsElement.addEventListener('dragleave', artifactDragLeaveHandler);

  var createWizards = function (wizardsCount) {
    var wizards = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizards[i] = {
        name: window.util.getRandomValue(FIRST_NAMES) + ' ' + window.util.getRandomValue(LAST_NAMES),
        coatColor: window.util.getRandomValue(window.setup.COAT_COLORS),
        eyesColor: window.util.getRandomValue(window.setup.EYES_COLORS)
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
