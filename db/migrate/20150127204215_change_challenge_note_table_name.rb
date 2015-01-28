class ChangeChallengeNoteTableName < ActiveRecord::Migration
  def change
  	rename_table :challenge_notes, :notes
  	rename_table :sightreading_challenges, :sightread_challenges
  	rename_column :notes, :sightreading_challenge_id, :sightread_challenge_id
  end
end
