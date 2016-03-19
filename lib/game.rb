class Game

  EMPTY = 'blank'.freeze

  def initialize(board)
    @board = board || []

    odd = (@board.select { |cell| cell == 'blank' }.length % 2 == 1)
    @players = {
      current: (odd ? 'cross' : 'zero'),
      next: (odd ? 'zero' : 'cross')
    }
  end

  def winner?(player, board = nil)
    board ||= @board

    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  end

  def has_moves?(board = nil)
    (board || @board).any? { |cell| cell == EMPTY }
  end

  def find_move
    best_move_value = -100
    move = 0

    return rand(@board.length) if @board.all? { |cell| cell == EMPTY }

    @board.each_with_index do |state, index|
      next unless state == EMPTY

      board = make_move(index, @players[:current], @board)
      predicted_move_value = min_value(board)

      if predicted_move_value > best_move_value
        best_move_value = predicted_move_value
        move = index
      end
    end

    move
  end

  def prize(board = nil)
    board ||= @board

    return 100 if winner?(@players[:current], board)
    return -100 if winner?(@players[:next], board)
    return 0 unless has_moves?(board)

    nil
  end

  private

    def make_move(index, player, board)
      board = board.dup
      board[index] = player
      board
    end

    def min_max_value(player, board, best_move_value, next_value, requirement)
      prize = self.prize(board)
      return prize unless prize.nil?

      board.each_with_index do |state, index|
        next unless state == EMPTY

        new_board = make_move(index, player, board)
        predicted_move_value = self.send(next_value, new_board)

        best_move_value = predicted_move_value if (predicted_move_value - best_move_value).send(requirement)
      end

      best_move_value
    end

    def min_value(board)
      min_max_value(@players[:next], board, 100, :max_value, :negative?)
    end

    def max_value(board)
      min_max_value(@players[:current], board, -100, :min_value, :positive?)
    end

end
