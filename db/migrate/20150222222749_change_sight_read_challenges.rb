class ChangeSightReadChallenges < ActiveRecord::Migration
  def change
  	rename_column :sightread_challenges, :key_sig, :key
  	rename_column :sightread_challenges, :time_sig, :time
  	
  	add_column :sightread_challenges, :notes, :text
  end
end
