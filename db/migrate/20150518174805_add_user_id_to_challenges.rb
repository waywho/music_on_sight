class AddUserIdToChallenges < ActiveRecord::Migration
  def change
  	add_column :sightread_challenges, :user_id, :integer

  	add_column :rhythm_challenges, :user_id, :integer
  end
end
