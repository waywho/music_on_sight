class AubioWraper 
	attr_accessor :wave_file

	def initialize
		@wave_file = Rails.root.join('data', 'test2.wav').to_s
	end

	def aubionotes_command
		"aubionotes -i #{self.wave_file} -t 1.3 -s -70" 
	end

	def exec_aubionotes_command
		`#{self.aubionotes_command}`
	end

	def parsed_aubionotes
		x = self.exec_aubionotes_command
		lines = x.lines
		lines.collect do |line|
			y = line.split("\t")
			{:midi => y[0], :on => y[1], :off => y[2]}
		end
	end
end