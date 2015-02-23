class SightreadChallengesController < ApplicationController
	def index
		@sightreadings = SightreadChallenge.all
	end

	def show
		@sightreading = SightreadChallenge.find(params[:id])s
	end

	def update
		@sightread = SightreadChallenge.find(params[:id])
		@sightread.update_attributes(challenge_params)
		redirect_to sightread_challenges_path
	end

	private
	def challenge_params
		params.require(:sightread_challenge).permit(:title, :tempo, :key, :time, :notes)
	end
end