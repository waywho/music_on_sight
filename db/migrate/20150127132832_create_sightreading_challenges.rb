class CreateSightreadingChallenges < ActiveRecord::Migration
  def change
    create_table :sightreading_challenges do |t|
    	t.string :title
    	t.integer :tempo
    	t.string :key_sig

      t.timestamps
    end
  end
end
