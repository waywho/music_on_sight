class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
    	t.integer :user_id
    	t.integer :total

      t.timestamps
    end
  end
end
