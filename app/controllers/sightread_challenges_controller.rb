class SightreadChallengesController < ApplicationController
	def index
		@sightreadings = SightreadingChallenge.all
	end

	def show
		@sightreading = SightreadingChallenge.find(params[:id])
	end
end
