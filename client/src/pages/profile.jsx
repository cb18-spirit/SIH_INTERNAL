import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    farmLocation: "",
    farmSize: "",
    crops: [],
    bio: ""
  });

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", media: null });

  // -----------------------------
  // Fetch profile + posts
  // -----------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = id
          ? `http://localhost:3000/api/users/${id}`       // public profile
          : `http://localhost:3000/api/users/profile`;   // logged-in user

        const res = await fetch(url, {
          method: "GET",
          credentials: "include", // important if using cookies
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        console.log("PROFILE DATA:", data);

        // If logged-in user endpoint: user is inside data.user
        if (data.success && data.user) {
          setProfile(data.user);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        if (!id) return; // Only fetch posts for specific users
        const res = await fetch(`http://localhost:3000/api/users/${id}/posts`);
        const data = await res.json();
        console.log("POSTS DATA:", data);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [id]);

  // -----------------------------
  // Profile form handlers
  // -----------------------------
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (crop) => {
    setProfile((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop],
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `http://localhost:3000/api/users/${id}`
        : `http://localhost:3000/api/users/profile`;

      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      console.log("UPDATE RESPONSE:", data);

      if (data.success) {
        alert("Profile Updated!");
        if (data.updatedUser) setProfile(data.updatedUser);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // -----------------------------
  // Post handlers
  // -----------------------------
  const handlePostChange = (e) => {
    if (e.target.name === "media") {
      setNewPost({ ...newPost, media: e.target.files[0] });
    } else {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) return alert("You must view a user's profile to post");

      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);
      if (newPost.media) formData.append("media", newPost.media);

      const res = await fetch(`http://localhost:3000/api/users/${id}/posts`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const savedPost = await res.json();
      console.log("NEW POST:", savedPost);

      setPosts([savedPost, ...posts]);
      setNewPost({ title: "", content: "", media: null });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-100 to-green-300 p-6">

      {/* Profile Edit Form */}
      <form
        onSubmit={handleProfileSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl mb-10"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Edit Profile
        </h2>

        {/* Name */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Write something about yourself..."
          value={profile.bio}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        ></textarea>

        {/* Farm Location */}
        <input
          type="text"
          name="farmLocation"
          placeholder="Farm Location"
          value={profile.farmLocation}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Farm Size */}
        <input
          type="number"
          name="farmSize"
          placeholder="Farm Size (acres)"
          value={profile.farmSize}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Crops */}
        <label className="block font-semibold text-gray-700 mb-2">
          Primary Crops:
        </label>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Corn", "Soybeans", "Wheat", "Tomatoes", "Cotton"].map((crop) => (
            <label
              key={crop}
              className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-green-50"
            >
              <input
                type="checkbox"
                checked={profile.crops.includes(crop)}
                onChange={() => handleCheckbox(crop)}
                className="h-4 w-4 text-green-600"
              />
              <span>{crop}</span>
            </label>
          ))}
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Save Profile
        </button>
      </form>

      {/* Post Section */}
      {id && (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            My Posts
          </h2>

          {/* New Post Form */}
          <form onSubmit={handlePostSubmit} className="mb-6">
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={newPost.title}
              onChange={handlePostChange}
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <textarea
              name="content"
              placeholder="Write your post..."
              value={newPost.content}
              onChange={handlePostChange}
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={handlePostChange}
              className="mb-4"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Add Post
            </button>
          </form>

          {/* Post List */}
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>

                  {/* Display media */}
                  {post.media && (
                    <>
                      {post.media.endsWith(".mp4") ? (
                        <video controls className="w-full my-2">
                          <source src={`http://localhost:3000/uploads${post.media}`} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={`http://localhost:3000/${post.media}`} alt="" className="w-full my-2" />
                      )}
                    </>
                  )}

                  <small className="text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;