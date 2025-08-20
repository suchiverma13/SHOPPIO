import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
    nationality: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Inside useEffect - fetch user data
useEffect(() => {
  const fetchUserProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/profile`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const fetchedUser = response.data.user;

        setUser(fetchedUser);
        setFormData({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          mobileNumber: fetchedUser.mobileNumber || "",
          location: fetchedUser.location || "",
          nationality: fetchedUser.nationality || "",
        });
        setProfileImage(fetchedUser.profilePicture || null);

        // ✅ database data ko localStorage me save karo
        localStorage.setItem("profileData", JSON.stringify(fetchedUser));
      } else {
        toast.error(response.data.message);

        // ❌ Agar backend fail ho, tab localStorage se load karo
        const localProfile = localStorage.getItem("profileData");
        if (localProfile) {
          const data = JSON.parse(localProfile);
          setUser(data);
          setFormData(data);
          setProfileImage(data.profilePicture || null);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch profile data.");

      // ❌ Error ke case me bhi localStorage fallback
      const localProfile = localStorage.getItem("profileData");
      if (localProfile) {
        const data = JSON.parse(localProfile);
        setUser(data);
        setFormData(data);
        setProfileImage(data.profilePicture || null);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchUserProfile();
}, [token, backendUrl]);


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 1. Update localStorage immediately
    const updatedProfile = {
      ...user,
      ...formData,
      profilePicture: profileImage, // keep preview image
    };
    setUser(updatedProfile);
    localStorage.setItem("profileData", JSON.stringify(updatedProfile));
    setIsEditing(false);
    toast.success("Profile saved locally!");

    // 2. Optional: send to backend asynchronously
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", user._id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("nationality", formData.nationality);

      if (profileImageFile) {
        formDataToSend.append("profilePicture", profileImageFile);
      }

      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formDataToSend,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error syncing profile:", error);
      // Removed the generic error toast for server sync
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <p>Loading profile...</p>
      </div>
    );
  if (!user)
    return (
      <div className="not-logged-in-container">
        <p>Please log in to view your profile.</p>
      </div>
    );

  return (
    <div className="profile-page flex flex-col items-center p-6 sm:p-12 bg-gray-50 min-h-screen text-gray-900">
      <div className="profile-card bg-white rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row gap-8 p-8">
        {/* Left Content */}
        <div className="profile-left flex-1">
          <h3 className="text-2xl font-semibold mb-2">My Profile</h3>
          <h1 className="text-3xl font-bold mb-3">
            {user.name || "Your Name Here"}
          </h1>
          <p className="mb-6 text-gray-700 text-lg">
            Hey <span className="font-semibold">{user.name || "User"}</span>!
            Welcome to Shoppio.
          </p>

          <div className="user-stats grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">
                {user.mobileNumber || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">Mobile Number</p>
            </div>
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">{user.location || "N/A"}</p>
              <p className="text-gray-600 text-sm">Location</p>
            </div>
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">
                {user.nationality || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">Nationality</p>
            </div>
          </div>

          <button
            className="mt-6 bg-black cursor-pointer text-white px-5 py-3 rounded flex items-center gap-2 hover:bg-gray-800 font-medium"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Right Content */}
        <div className="profile-right flex-shrink-0">
          <div
            className="profile-image-container w-52 h-52 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/10061/10061438.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="edit-form-container mt-8 bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-5">Edit Profile</h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Name"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
              required
            />
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleFormChange}
              placeholder="Mobile Number"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
              placeholder="Location"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleFormChange}
              placeholder="Nationality"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 font-medium text-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-400 py-3 rounded hover:bg-gray-100 font-medium text-lg"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;