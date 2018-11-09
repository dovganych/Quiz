import { TrivialAPI } from './TrivialApi.js';
import { Player } from './Player.js';

export class Quiz {
  constructor (){
    this.trivial = new TrivialAPI();
    this.player = new Player();
    this.correct_answers = [];
    this.customedRequest = '';
  }

  processQuiz (){
    this.initializeDomElements();
    this.hideElements(this.$domElements.quizForm, 
      this.$domElements.questions,
      this.$domElements.resultBlock);
    this.listeningStartQuiz();
  }

  initializeDomElements (){
    const elementsArray = ['quizForm', 'questions', 'resultBlock', 'startQuizButton', 'submite',
      'checkButton', 'questionsBlock', 'restart', 'createNewQuize', 'starQuizeBlock',
      'playerNameBtn', 'playerName', 'playerResult'];
    this.$domElements = elementsArray.reduce((obj, item) => {
      obj[item] = document.getElementById(item);
      return obj;
    }, {});
  }

  selectCategoris (data){
    const categories = document.getElementById('categories');
    data.trivia_categories.forEach(item => categories.appendChild(this.createOption(item)));
  }

  convertUrlData (formData){
    const data = Object.values(formData).reduce((obj,field) => { 
      if (field.value !== 'any' && field.value){
        obj[field.id] = field.value;
      }
      return obj;
    }, {});
    return Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
  }

  listeningStartQuiz (){
    this.$domElements.startQuizButton.addEventListener('click', event => {
      event.stopImmediatePropagation();
      this.player.nickname = this.$domElements.playerNameBtn.value;
      this.hideElements(this.$domElements.starQuizeBlock);
      this.processForm();
    });
  }

  processForm (){
    this.trivial.getCategoris((this.selectCategoris).bind(this));
    this.showElements(this.$domElements.quizForm);
    this.listeningSubmit(this.$domElements.quizForm);
  }

  listeningSubmit (element){
    this.$domElements.submite.addEventListener('click', event => {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.customedRequest = this.convertUrlData(element);
      this.processQuestins();
      this.hideElements(element);
    });
  }

  processQuestins (){
    this.initQuestionsBox();
    this.showElements(this.$domElements.questions);
    this.trivial.getCustomedQuiz(this.parseQuestions.bind(this), this.customedRequest);
    this.listeningCheckAnswers();
  }

  parseQuestions (data){
    this.player.maxScore = data.results.length;
    data.results.forEach((item, index) => {
      const answers = item.incorrect_answers.concat(item.correct_answer);
      this.correct_answers.push(item.correct_answer);
      const $section = this.createSection(index);
      this.$domElements.questionsBlock.appendChild($section);
      $section.appendChild(this.createHeading(index));
      $section.appendChild(this.createMain(item.question));
      $section.appendChild(this.createAnswersBox(answers, index));
    });
  }

  listeningCheckAnswers (){
    this.$domElements.checkButton.addEventListener('click', event => {
      event.stopImmediatePropagation();
      this.checkAnwers();
      this.renderPlayerResult();
      this.triggerElements(this.$domElements.questions, this.$domElements.resultBlock);
    });
  }

  checkAnwers (){
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    this.player.result =  Object.values(radios).reduce((acc, item) => { 
      return (this.correct_answers[item.name.slice(-1)] === item.value) ? ++acc : acc;
    }, 0);
  }

  deleteQuestions (){
    while (this.$domElements.questionsBlock.firstChild) {
      this.$domElements.questionsBlock.removeChild(this.$domElements.questionsBlock.firstChild);
    }
  }

  clearAnswears (){
    this.correct_answers.length = 0;
  }

  initQuestionsBox (){
    this.deleteQuestions();
    this.clearAnswears();
  }

  renderPlayerResult (){
    this.$domElements.playerName.innerHTML = this.player.nickname;
    this.$domElements.playerResult.innerHTML = `${this.player.result} / ${this.player.maxScore}`;
    this.listeningRestart();
    this.listeningCreateNewQuize();
  }

  listeningRestart (){
    this.$domElements.restart.addEventListener('click', event => {
      event.stopImmediatePropagation();
      this.hideElements(this.$domElements.resultBlock);
      this.processQuestins();
    });
  }

  listeningCreateNewQuize (){
    this.$domElements.createNewQuize.addEventListener('click', event => {
      event.stopImmediatePropagation();
      this.hideElements(this.$domElements.resultBlock);
      this.processForm();
    });
  }

  hideElements (...elements){
    elements.forEach(item => item.style.display = 'none');
  }

  showElements (...elements){
    elements.forEach(item => item.style.display = 'block');
  }

  triggerElements (hideElement, showElement){
    this.hideElements(hideElement);
    this.showElements(showElement);
  }

  createOption (data){
    const option = document.createElement('option');
    option.value = data.id;
    option.innerHTML = data.name;
    return option;
  }

  createHeading (number){
    const header = document.createElement('header');
    header.innerHTML = `Question #${number + 1}`;
    return header;
  }

  createMain (text){
    const main = document.createElement('main');
    main.innerHTML = text;
    return main;
  }

  createSection (index){
    const section = document.createElement('section');
    section.id = index;
    return section;
  }

  createLabel (item){
    const label = document.createElement('label');
    label.htmlFor = item;
    label.innerHTML = item;
    return label;
  }

  createRadio (item, index){
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `answers-${index}`;
    input.value = item;
    input.id = item;
    return input;
  }

  createAnswersBox (answers, index){
    const div = document.createElement('div');
    answers.forEach(item => {
      div.appendChild(this.createLabel(item));
      div.appendChild(this.createRadio(item, index));
    });
    return div;
  }
}