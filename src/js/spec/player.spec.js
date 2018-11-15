import { Player } from '../Player.js';

const player = new Player();
player.maxScore = 20;

describe('should calculate player rating in percentage::', () => {
  it('and to be equal 50', () => {
    player.result = 10;
    expect(player.rating).toEqual(50);
  });
  
  it('and to be equal 80', () => {
    player.result = 15;
    expect(player.rating).toEqual(80);
  });
});

