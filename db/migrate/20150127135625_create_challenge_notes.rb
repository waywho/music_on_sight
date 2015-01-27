class CreateChallengeNotes < ActiveRecord::Migration
  def change
    create_table :challenge_notes do |t|
    	t.string :note_name
    	t.integer :midi_num
    	t.integer :duration
    	t.integer :sightreading_challenges_id

      t.timestamps
    end
  end
end
