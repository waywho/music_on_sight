class SightreadChallengesController < ApplicationController
	def index
		@sightreadings = SightreadChallenge.all
	end

	def show
		@sightreading = SightreadChallenge.find(params[:id])
	end

end
