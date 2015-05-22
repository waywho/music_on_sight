class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

 has_many :scores
 has_many :sightread_challenges
 has_many :completed_sightread_challenges, :through => :scores, :source => :sightread_challenge
 
end
