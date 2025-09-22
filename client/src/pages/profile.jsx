import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("profileData");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          firstName: "Part",
          lastName: "Sarthi",
          email: "mishraanju2073@gmail.com",
          location: "Springfield, IL",
          farmSize: 250,
          crops: ["Corn", "Soybeans"],
        };
  });

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("userPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [newPost, setNewPost] = useState({ title: "", content: "", image: "" });

  const handleSaveProfile = () => {
    localStorage.setItem("profileData", JSON.stringify(user));
    alert("✅ Profile saved successfully!");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCrop = (crop, checked) => {
    if (checked) {
      setUser((prev) => ({ ...prev, crops: [...prev.crops, crop] }));
    } else {
      setUser((prev) => ({
        ...prev,
        crops: prev.crops.filter((c) => c !== crop),
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      alert("⚠️ Please fill in title and content.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: newPost.title,
      date: new Date().toLocaleDateString(),
      content: newPost.content,
      image: newPost.image,
    };

    const updatedPosts = [newEntry, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));

    setNewPost({ title: "", content: "", image: "" });
    document.getElementById("postImage").value = "";
  };

  // 🗑️ Delete a post
  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-green-700 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg">{user.email}</p>
          <p className="mt-1">
            📍 {user.location} • 🌾 Farm Size: {user.farmSize} acres
          </p>
          <p className="mt-1">
            🌱 Crops: {user.crops.length > 0 ? user.crops.join(", ") : "None"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Profile Edit Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Edit Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleProfileChange}
              placeholder="First Name"
              className="border rounded-lg p-3"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleProfileChange}
              placeholder="Last Name"
              className="border rounded-lg p-3"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="border rounded-lg p-3 col-span-2"
            />
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleProfileChange}
              placeholder="Farm Location"
              className="border rounded-lg p-3 col-span-2"
            />
            <input
              type="number"
              name="farmSize"
              value={user.farmSize}
              onChange={handleProfileChange}
              placeholder="Farm Size (acres)"
              className="border rounded-lg p-3 col-span-2"
            />
          </div>

          {/* Crops */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Primary Crops:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Corn", "Soybeans", "Wheat", "Tomatoes", "Cotton"].map(
                (crop) => (
                  <label
                    key={crop}
                    className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border"
                  >
                    <input
                      type="checkbox"
                      checked={user.crops.includes(crop)}
                      onChange={(e) => toggleCrop(crop, e.target.checked)}
                    />
                    <span>{crop}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Save Profile
          </button>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Create a Post
          </h2>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Post Title"
            className="w-full border rounded-lg p-3 mb-3"
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="What's on your mind?"
            className="w-full border rounded-lg p-3 mb-3"
            rows="4"
          />
          <input
            type="file"
            id="postImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-3"
          />
          <button
            onClick={handleAddPost}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </div>

        {/* Posts Feed */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">My Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-lg">No posts yet. Create one above!</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full max-h-[600px] object-cover"
                    />
                  )}
                  <div className="p-6 relative">
                    <h3 className="font-bold text-xl">{post.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                    <p className="text-lg">{post.content}</p>

                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
