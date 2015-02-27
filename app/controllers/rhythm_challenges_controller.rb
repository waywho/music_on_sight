class RhythmChallengesController < ApplicationController
	def index
		@rhythms = RhythmChallenge.all
	end

	def show
		@rhythm = RhythmChallenge.find(params[:id])
	end
end
