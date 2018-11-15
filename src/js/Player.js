export class Player{
  constructor (){
    this._nickname = '';
    this._result = 0;
    this._rating = 0;
    this._maxScore = 0;
  }

  get nickname (){
    return this._nickname;
  }

  set nickname (nickname){
    this._nickname = nickname;
  }

  get result (){
    return this._result;
  }
  set result (result){
    this._result = result;
  }
  get rating (){
    this._rating = (this.result * 100) / this._maxScore;
    return Math.ceil(this._rating / 10) * 10;
  }

  get maxScore (){
    return this._maxScore;
  }

  set maxScore (maxScore){
    this._maxScore = maxScore;
  }
}