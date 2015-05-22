class SightreadChallengesController < ApplicationController
	before_action :authenticate_user!, :only => [:show]

	def index
		@sightreadings = SightreadChallenge.all
	end

	def show
		@sightreading = SightreadChallenge.find(params[:id])
		@user = current_user
		@score = current_score
		# @scores = Score.sum(:user_id => current_user.id)
	end

	def add_score
		@sightreading = SightreadChallenge.find(params[:sightread_challenge_id])
		score = current_user.scores.find_by(:sightread_challenge_id => @sightreading)
		
		if score.nil?
			@score = current_user.scores.create(score_params.merge(:sightread_challenge => @sightreading))
			# @score = Score.create(score_params.merge(:sightread_challenge => @sightreading))
			render :json => @score
		else	
			@score = score.update_attributes(score_params)
			render :json => @score
		end
		#@score = Score.new(score_params)
		#@score.user = current_user
		#@score.sightread_challenge = @sightreading
		#@score.save
	end

	def update
		@sightread = SightreadChallenge.find(params[:id])
		@sightread.update_attributes(challenge_params)
		redirect_to sightread_challenges_path
	end

	private

	def current_score
		current_user.scores.find_by(:sightread_challenge_id => params[:id])
	end

	def challenge_params
		params.require(:sightread_challenge).permit(:title, :tempo, :key, :time, :notes)
	end

	def score_params
		params.require(:score).permit(:total)
	end
end