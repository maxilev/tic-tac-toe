require 'spec_helper'

describe Game do
  let(:empty) { Array.new(9, 'blank') }
  let(:obvious) { ['zero', 'cross', 'cross', 'blank', 'zero', 'cross', 'blank', 'blank', 'blank'] }
  let(:winning) { ['cross', 'zero', 'cross', 'zero', 'cross', 'zero', 'cross', 'zero', 'cross'] }

  describe '#has_moves?' do
    it 'returns true for empty board' do
      expect(Game.new(empty).has_moves?).to be_truthy
    end

    it 'returns false for winning board' do
      expect(Game.new(winning).has_moves?).to be_falsy
    end
  end

  describe '#winner?' do
    it 'returns true for cross' do
      expect(Game.new(winning).winner?('cross')).to be_truthy
    end

    it 'returns true for zero' do
      expect(Game.new(winning).winner?('zero')).to be_falsy
    end
  end

  describe '#find_move' do
    it 'returns optimal move' do
      expect(Game.new(obvious).find_move).to eq(8)
    end
  end

  describe '#prize' do
    it 'returns nil on empty board' do
      expect(Game.new(empty).prize).to be_nil
    end

    it 'returns -100 on winning board for next user' do
      expect(Game.new(winning).prize).to eq(-100)
    end
  end
end
