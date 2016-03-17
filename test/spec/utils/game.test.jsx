import { expect } from 'spec_helper';
import Game from 'utils/game';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('#play', () => {
    it('makes AI move after human', () => {
      expect(game.board.indexOf(game.players.human)).to.equal(-1);
      expect(game.board.indexOf(game.players.AI)).to.equal(-1);

      game.play(0);

      expect(game.board.indexOf(game.players.human)).not.to.equal(-1);
      expect(game.board.indexOf(game.players.AI)).not.to.equal(-1);
    });
  });

  describe('#winner', () => {
    it('returns state for given player', () => {
      const player = game.players.human;
      expect(game.winner(player)).to.be.false;
    });
  });

  describe('#hasMoves', () => {
    context('when board has empty cells', () => {
      it('returns true', () => {
        expect(game.hasMoves()).to.be.true;
      });
    });

    context('when board does not have empty cells', () => {
      it('returns false', () => {
        game.board.forEach((value, index) => {
          game.play(index);
        });

        expect(game.hasMoves()).to.be.false;
      });
    });
  });
});
