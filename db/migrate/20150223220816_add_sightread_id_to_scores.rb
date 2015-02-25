class AddSightreadIdToScores < ActiveRecord::Migration
  def change
  	add_column :scores, :sightread_challenge_id, :integer

  	add_index :scores, :sightread_challenge_id
  end
end
