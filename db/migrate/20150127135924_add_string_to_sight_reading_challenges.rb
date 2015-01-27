class AddStringToSightReadingChallenges < ActiveRecord::Migration
  def change
  	add_column :sightreading_challenges, :time_sig, :string
  end
end
