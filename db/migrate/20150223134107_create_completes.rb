class CreateCompletes < ActiveRecord::Migration
  def change
    create_table :completes do |t|
    	t.integer :user_id
    	t.integer :sightread_challenge_id

      t.timestamps
    end
  end
end
