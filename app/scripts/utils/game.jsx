class Game {

  constructor() {
    const size = 3;
    this.board = Array(size * size).fill(null);
    this.players = {
      human: 'x',
      AI: 'o'
    };
  }

  /**
   * Returns state for given cell
   */
  state(idx) {
    return this.board[idx];
  }

  /**
   * Make move by human and respond by AI
   */
  play(idx) {
    if (this.board[idx]) {
      return;
    }

    this.board[idx] = this.players.human;
    if (this.hasMoves()) {
      this.board[this.findMove()] = this.players.AI;
    }
  }

  /**
   * Clone given board
   */
  cloneBoard(board) {
    return board.slice(0);
  }

  /**
   * Check if player is a winner on the given board
   */
  winner(player, board) {
    board = board || this.board;

    const winner =
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player);

    return winner;
  }

  /**
   * Check if board has moves or not
   */
  hasMoves(board) {
    board = board || this.board;
    return board.indexOf(null) !== -1;
  }

  /**
   * Returns prize for AI
   */
  prize(board) {
    board = board || this.board;

    if (this.winner(this.players.AI, board)) {
      return 100;
    }

    if (this.winner(this.players.human, board)) {
      return -100;
    }

    if (!this.hasMoves(board)) {
      return 0;
    }

    return null;
  }

  /**
   * Make a move on the board
   */
  makeMove(idx, player, board) {
    const newBoard = this.cloneBoard(board);
    newBoard[idx] = player;
    return newBoard;
  }

  /**
   * Find optimal move for AI
   */
  findMove(board) {
    board = board || this.board;

    let bestMoveValue = -100;
    let move = 0;

    board.forEach((value, index) => {
      if (value) {
        return;
      }

      const newBoard = this.makeMove(index, this.players.AI, board);
      const predictedMoveValue = this.minValue(newBoard);

      if (predictedMoveValue > bestMoveValue) {
        bestMoveValue = predictedMoveValue;
        move = index;
      }
    });

    return move;
  }

  /**
   * Implements Minimax algorithm
   */
  minmaxValue(player, board, bestMoveValue, nextValue, compare) {
    const prize = this.prize(board);
    if (parseInt(prize) === prize) {
      return prize;
    }

    board.forEach((state, index) => {
      if (state) {
        return;
      }

      const newBoard = this.makeMove(index, player, board);
      const predictedMoveValue = nextValue(newBoard);

      if (compare(predictedMoveValue, bestMoveValue)) {
        bestMoveValue = predictedMoveValue;
      }
    });

    return bestMoveValue;
  }

  /**
   * Search for minimum value for the given board
   */
  minValue(board) {
    return this.minmaxValue(this.players.human, board, 100, this.maxValue.bind(this), (predictedMoveValue, bestMoveValue) => {
      return predictedMoveValue < bestMoveValue;
    });
  }

  /**
   * Search for maximum value for the given board
   */
  maxValue(board) {
    return this.minmaxValue(this.players.AI, board, -100, this.minValue.bind(this), (predictedMoveValue, bestMoveValue) => {
      return predictedMoveValue > bestMoveValue;
    });
  }

}

export default Game;
