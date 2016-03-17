import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Board extends Component {

  static propTypes = {
    size: React.PropTypes.number
  };

  static defaultProps = {
    size: 3
  };

  constructor(props, context) {
    super(props, context);

    const { size } = props;
    this.state = {
      board: Array(size * size).fill(null)
    };
  }

  _mark(idx, value) {
    const { board } = this.state;

    if (board[idx]) {
      return;
    }

    board[idx] = value;
    this.setState({ board });
  }

  render() {
    const { size } = this.props;
    const rows = Array(size).fill(null).map((value, idx) => {
      return this.renderRow(idx);
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='board col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 col-xs-12'>
            { rows }
          </div>
        </div>
      </div>
    );
  }

  renderRow(row) {
    const { size } = this.props;
    const cells = Array(size).fill(null).map((value, idx) => {
      return this.renderCell(row * size + idx);
    });

    return (
      <div key={ row } className='board-row row'>
        { cells }
      </div>
    );
  }

  renderCell(idx) {
    const { board } = this.state;

    return (
      <div key={ idx } className='col-xs-4'>
        <span
          className={
            classNames('board-cell', {
              blank: !board[idx],
              cross: board[idx] === 'cross',
              zero: board[idx] === 'zero'
            })
          }
          onClick={ this._mark.bind(this, idx, 'cross') }
        ></span>
      </div>
    );
  }

}

export default Board;
