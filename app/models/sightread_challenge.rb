class SightreadChallenge < ActiveRecord::Base
	has_many :notes

	# def eval_notes
	# 	sound = AubioWraper.new
	# 	sound.parsed_aubionotes

	# 	sound.each do |midi, on, off|
	# 		on_before = sound.at(sound.index(on) - 1)
	# 		have_note != on.nil

	# 		if have_note
	# 			puts "Well done!" if midi/@sightreading.note > .80
	# 			puts "Good timing!" if (on - on_before) /@sightreading.duration > .90
	# 		end
	# 	end
	# end
end
