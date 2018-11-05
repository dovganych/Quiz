import { TrivialAPI } from './TrivialApi.js';
import { Player } from './Player.js';

const trivial = new TrivialAPI();
const player = new Player();

const correct_answers = [];
let customedRequest = '';

const $quizForm = document.getElementById('quiz-form');
const $questionsDiv = document.getElementById('questions');
const $resultDiv = document.getElementById('result');
$quizForm.style.display = 'none';
$questionsDiv.style.display = 'none';
$resultDiv.style.display = 'none';

//  -------------------------------dom functions

const createOption = data => {
  const option = document.createElement('option');
  option.value = data.id;
  option.innerHTML = data.name;
  return option;
};

const createHeading = number => {
  const header = document.createElement('header');
  header.innerHTML = `Question #${number + 1}`;
  return header;
};

const createMain = text => {
  const main = document.createElement('main');
  main.innerHTML = text;
  return main;
};

const createSection = index => {
  const section = document.createElement('section');
  section.id = index;
  return section;
};

const createLabel = item => {
  const label = document.createElement('label');
  label.htmlFor = item;
  label.innerHTML = item;
  return label;
};

const createRadio = (item, index) => {
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = `answers-${index}`;
  input.value = item;
  input.id = item;
  return input;
};

const createAnswersBox = (answers, index) => {
  const div = document.createElement('div');
  answers.forEach(item => {
    div.appendChild(createLabel(item));
    div.appendChild(createRadio(item, index));
  });
  return div;
};

//  -------------------------------dom functions

const selectCategoris = data => {
  const select = document.getElementById('categories');
  data.trivia_categories.forEach(item => select.appendChild(createOption(item)));
};

const convertUrlData = formData => {
  const data = Object.values(formData).reduce((obj,field) => { 
    if (field.value !== 'any' && field.value){
      obj[field.id] = field.value;
    }
    return obj;
  }, {});
  return Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
};

//-----------------------------start block

const listeningStartQuiz = () => {
  const $startQuizButton = document.getElementById('star-quize');
  $startQuizButton.addEventListener('click', event => {
    event.stopImmediatePropagation();
    player.nickname = document.getElementById('player-name-btn').value;
    document.getElementById('star-quize-box').style.display = 'none';
    processForm();
  });
};

//-----------------------------start block
//-----------------------------form block

const processForm = () => {
  trivial.getCategoris(selectCategoris);
  $quizForm.style.display = 'block';
  listeningSubmit($quizForm);
};

const listeningSubmit = element => {
  const $submite = document.getElementById('submite');
  $submite.addEventListener('click', event => {
    event.stopImmediatePropagation();
    event.preventDefault();
    customedRequest = convertUrlData(element);
    processQuestins();
    element.style.display = 'none';
  });
};

//-----------------------------form block

//-----------------------------answears block

const processQuestins = () => {
  initQuestionsBox();
  $questionsDiv.style.display = 'block';
  trivial.getCustomedQuiz(parseQuestions, customedRequest);
  listeningCheckAnswers();
};

const parseQuestions = data => {
  player.maxScore = data.results.length;
  const $main = document.getElementById('questions-box');
  data.results.forEach((item, index) => {
    const answers = item.incorrect_answers.concat(item.correct_answer);
    correct_answers.push(item.correct_answer);
    const $section = createSection(index);
    $main.appendChild($section);
    $section.appendChild(createHeading(index));
    $section.appendChild(createMain(item.question));
    $section.appendChild(createAnswersBox(answers, index));
  });
};

const listeningCheckAnswers = () => {
  const $checkButton = document.getElementById('check-button');
  $checkButton.addEventListener('click', event => {
    event.stopImmediatePropagation();
    checkAnwers();
    renderPlayerResult();
    trigerQuestionsResult($questionsDiv, $resultDiv);
  });
};

const trigerQuestionsResult = (questionsBlock, resultBlock) => {
  questionsBlock.style.display = 'none';
  resultBlock.style.display = 'block';
};

const checkAnwers = () => {
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  player.result =  Object.values(radios).reduce((acc, item) => { 
    return (correct_answers[item.name.slice(-1)] === item.value) ? ++acc : acc;
  }, 0);
};

const deleteQuestions = () => {
  const $main = document.getElementById('questions-box');
  while ($main.firstChild) {
    $main.removeChild($main.firstChild);
  }
};

const clearAnswears = () => {
  correct_answers.length = 0;
};

const initQuestionsBox = () => {
  deleteQuestions();
  clearAnswears();
};

//-----------------------------answears block


//-----------------------------result block

const renderPlayerResult = () => {
  document.getElementById('player-name').innerHTML = player.nickname;
  document.getElementById('player-result').innerHTML = `${player.result} / ${player.maxScore}`;
  listeningRestart();
  listeningCreateNewQuize();
};

const listeningRestart = () => {
  const $restart = document.getElementById('restart');
  const $resultDiv = document.getElementById('result');
  $restart.addEventListener('click', event => {
    event.stopImmediatePropagation();
    $resultDiv.style.display = 'none';
    processQuestins();
  });
};

const listeningCreateNewQuize = () => {
  const $createNewQuize = document.getElementById('create-new-quize');
  const $resultDiv = document.getElementById('result');
  $createNewQuize.addEventListener('click', event => {
    event.stopImmediatePropagation();
    $resultDiv.style.display = 'none';
    processForm();
  });
};
//-----------------------------result block

listeningStartQuiz();

