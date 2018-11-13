import { Quiz } from './Quiz.js';

const quiz = new Quiz();
quiz.processQuiz();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js');
  });
}