export class TrivialAPI {

  constructor (){
    this.BASE_URL = {
      API: 'https://opentdb.com/api.php',
      CATEGORIES: 'https://opentdb.com/api_category.php'
    };
  }

  fetchData (url, method){
    fetch(url)
      .then(response => response.json())
      .then(json => { 
        method(json); 
      }); 
  }

  getCategoris (method){
    this.fetchData(this.BASE_URL.CATEGORIES, method );
  }

  getCustomedQuiz (method, options){
    this.fetchData(`${this.BASE_URL.API}?${options}`, method);
  }

}
