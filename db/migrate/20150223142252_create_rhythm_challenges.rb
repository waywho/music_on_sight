class CreateRhythmChallenges < ActiveRecord::Migration
  def change
    create_table :rhythm_challenges do |t|
    	t.string :title
    	t.integer :tempo
    	t.string :time
    	t.text :notes

      t.timestamps
    end
  end
end
