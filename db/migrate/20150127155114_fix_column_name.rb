class FixColumnName < ActiveRecord::Migration
  def change
  	rename_column :challenge_notes, :sightreading_challenges_id, :sightreading_challenge_id
  end
end
