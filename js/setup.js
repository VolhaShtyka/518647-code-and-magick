'use strict';

(function () {

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

  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var wizards;

  var loadHandler = function (data) {
    window.setup.wizards = data;
    renderSimilarWizards(window.setup.wizards);
  };

  var errorHandler = function (message) {
    var errorDialog = document.createElement('div');
    errorDialog.style = 'z-index: 100; margin: 20%; text-align: center; background-color: #FFD2D2;';
    errorDialog.style.color = 'blue';
    errorDialog.style.textShadow = '5px 5px 1px white';
    errorDialog.style.position = 'absolute';
    errorDialog.style.width = '50%';
    errorDialog.style.fontSize = '2em';

    errorDialog.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorDialog);
  };

  window.backend.load(loadHandler, errorHandler);

  window.setup = {
    errorHandler: errorHandler,
    wizards: wizards,
    renderSimilarWizards: function () {
      renderSimilarWizards(window.setup.wizards);
    }
  };
})();
