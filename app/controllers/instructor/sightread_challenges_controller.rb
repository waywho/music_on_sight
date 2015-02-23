class Instructor::SightreadChallengesController < ApplicationController
	def new
		@sightread = SightreadChallenge.new
	end
end
