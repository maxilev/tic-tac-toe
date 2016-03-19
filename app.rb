require 'sinatra/base'
require 'sinatra/json'
require 'json'
require './lib/game'

class App < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/check' do
    board = JSON.parse(params[:board]) rescue []
    json prize: Game.new(board).prize
  end

  get '/move' do
    board = JSON.parse(params[:board]) rescue []
    json index: Game.new(board).find_move
  end
end
