import { React, TestUtils, expect } from 'spec_helper';
import Board from 'components/board';

describe('Board', () => {
  const size = 3;
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Board size={ size } />);
  });

  it('renders board component', () => {
    const container = TestUtils.findRenderedDOMComponentWithClass(component, 'board');
    expect(container).not.to.be.undefined;
  });

  it('contains correct number of rows', () => {
    const rows = TestUtils.scryRenderedDOMComponentsWithClass(component, 'board-row');
    expect(rows.length).to.equal(size);
  });

  it('contains correct number of cells', () => {
    const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'board-cell');
    expect(cells.length).to.equal(size * size);
  });

  describe('#makeMove', () => {
    const idx = 0;

    it('marks cell with class name of current user', () => {
      const { board, current } = component.state;

      expect(board[idx]).to.equal('blank');
      component._makeMove(idx);
      expect(board[idx]).to.equal(Board.players[current]);
    });

    it('changes current user', () => {
      const { current } = component.state;
      component._makeMove(idx);
      expect(component.state.current).not.to.equal(current);
    });
  });

  describe('#reset', () => {
    beforeEach(() => {
      component._makeMove(0);
    });

    it('starts new game', () => {
      const type = 'cross';

      expect(component.state.board.indexOf(type)).not.to.equal(-1);
      component._reset();
      expect(component.state.board.indexOf(type)).to.equal(-1);
    });
  });
});
