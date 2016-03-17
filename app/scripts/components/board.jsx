import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Game from 'utils/game';

class Board extends Component {

  static propTypes = {
    size: React.PropTypes.number
  };

  static defaultProps = {
    size: 3
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      game: new Game()
    };
  }

  _play(idx) {
    const { game } = this.state;
    game.play(idx);
    this.setState({ game });
  }

  render() {
    const { size } = this.props;
    const { game } = this.state;
    const prize = game.prize();

    const rows = Array(size).fill(null).map((value, idx) => {
      return this.renderRow(idx);
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='board col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 col-xs-12'>
            <div className={ classNames('alert alert-danger text-center', { hidden: !prize }) } role='alert'>
              You lost!
            </div>

            <div className='board-rows'>
              { rows }
            </div>
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
    const { game } = this.state;
    const state = game.state(idx);

    return (
      <div key={ idx } className='col-xs-4'>
        <span
          className={
            classNames('board-cell', {
              blank: !state,
              cross: state === 'x',
              zero: state === 'o'
            })
          }
          onClick={ this._play.bind(this, idx) }
        ></span>
      </div>
    );
  }

}

export default Board;
