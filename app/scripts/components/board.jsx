import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Board extends Component {

  static propTypes = {
    size: React.PropTypes.number
  };

  static defaultProps = {
    size: 3
  };

  static players = {
    player1: 'cross',
    player2: 'zero'
  };

  constructor(props, context) {
    super(props, context);
    this.state = this._defaultState();
  }

  _defaultState() {
    const { size } = this.props;

    return {
      board: Array(size * size).fill('blank'),
      current: Object.keys(Board.players)[0],
      mode: null,
      modalVisible: false
    }
  }

  _makeMove(idx) {
    const { board, current } = this.state;
    const players = Object.keys(Board.players);
    const next = players[(players.indexOf(current) + 1) % players.length];

    if (board[idx] !== 'blank') {
      return;
    }

    board[idx] = Board.players[current];
    this.setState({ board, current: next });
  }

  _reset() {
    this.setState(this._defaultState());
  }

  _chooseMode(mode) {
    this.setState({ mode, modalVisible: mode === 'single' });
  }

  _toggleModal() {
    const modalVisible = !this.state.modalVisible;
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div className='board'>
        <div className='container-fluid'>
          { this.renderAlerts() }
          { this.renderActions() }
          { this.renderBoard() }
          { this.renderModal() }
        </div>
      </div>
    );
  }

  renderBoard() {
    const { size } = this.props;
    const { current, mode } = this.state;

    const rows = Array(size).fill(null).map((value, idx) => {
      return this.renderRow(idx);
    });

    return (
      <div className='row'>
        <div className={ classNames('board-rows', `hover-${Board.players[current]}`, { disabled: !mode }) }>
          { rows }
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
    const state = board[idx];

    return (
      <div key={ idx } className='col-xs-4'>
        <span
          className={ classNames('board-cell', board[idx]) }
          onClick={ this._makeMove.bind(this, idx) }
        ></span>
      </div>
    );
  }

  renderActions() {
    const { mode } = this.state;

    return (
      <div className='row text-center'>
        <div className='btn-toolbar actions'>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={ !mode }
              onClick={ this._reset.bind(this) }
            >
              New game
            </button>
          </div>

          <div className='btn-group' role='group'>
            <button
              type='button'
              className={ classNames('btn btn-default', { active: mode === 'single' }) }
              disabled={ !!mode }
              onClick={ this._chooseMode.bind(this, 'single') }
            >
              1 player
            </button>

            <button
              type='button'
              className={ classNames('btn btn-default', { active: mode === 'multiple' }) }
              disabled={ !!mode }
              onClick={ this._chooseMode.bind(this, 'multiple') }
            >
              2 players
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderAlerts() {
    const { mode } = this.state;

    return (
      <div className='row text-center'>
        <div className={ classNames('alert alert-info', { hidden: !!mode }) } role='alert'>
          Choose number of players to start
        </div>
      </div>
    );
  }

  renderModal() {
    const { modalVisible } = this.state;

    return (
      <div className={ classNames('modal fade text-center', { visible: modalVisible }) } tabIndex='-1' role='dialog'>
        <div className='modal-dialog modal-sm'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>Do you want to start first?</p>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                onClick={ this._toggleModal.bind(this) }
              >
                No
              </button>

              <button
                type='button'
                className='btn btn-primary'
                onClick={ this._toggleModal.bind(this) }
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Board;
