class Instructor::SightreadChallengesController < ApplicationController
	def new
		@sightread = SightreadChallenge.new
	end

	def create
		@sightread = SightreadChallenge.create(challenge_params)
		redirect_to sightread_challenges_path
	end

	def edit
		@sightread = SightreadChallenge.find(params[:id])
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
