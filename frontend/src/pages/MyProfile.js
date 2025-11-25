import React, { useState, useEffect } from 'react';
import { Camera, Edit3, Calendar, Star, Film } from 'lucide-react';

const MyProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2023',
    bio: 'Passionate movie lover and critic. I enjoy all genres but have a special place in my heart for sci-fi and thrillers.',
    avatar: null,
    totalReviews: 42,
    averageRating: 4.3,
    favoriteGenre: 'Science Fiction'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setEditedUser(prev => ({
          ...prev,
          avatar: upload.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
          
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors shadow-md">
                    <Camera size={16} className="text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-purple-100 mb-2">{user.email}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center text-purple-100">
                      <Calendar size={16} className="mr-2" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedUser(user);
                  }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <Edit3 size={16} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">About Me</h3>
                    <p className="text-gray-300">{user.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Film className="text-purple-400 mr-2" />
                        <h4 className="font-semibold text-white">Reviews</h4>
                      </div>
                      <p className="text-2xl font-bold text-purple-400">{user.totalReviews}</p>
                    </div>
                    
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="text-yellow-400 mr-2" />
                        <h4 className="font-semibold text-white">Avg Rating</h4>
                      </div>
                      <p className="text-2xl font-bold text-yellow-400">{user.averageRating}</p>
                    </div>
                    
                    <div className="bg-gray-750 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="text-pink-400 mr-2" />
                        <h4 className="font-semibold text-white">Favorite Genre</h4>
                      </div>
                      <p className="text-lg font-semibold text-pink-400">{user.favoriteGenre}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;