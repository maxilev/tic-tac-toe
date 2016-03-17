import { React, TestUtils, expect } from 'spec_helper';
import Board from 'components/board';

describe('Board', () => {
  const size = 3;
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Board size={ 3 } />);
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

  it('marks cell with given value if cell is available', () => {
    const { board } = component.state;
    const idx = 0;
    const value = 'cross';

    expect(board[idx]).to.equal(null);
    component._mark(idx, value);
    expect(board[idx]).to.equal(value);
    component._mark(idx, 'zero');
    expect(board[idx]).to.equal(value);
  });
});
