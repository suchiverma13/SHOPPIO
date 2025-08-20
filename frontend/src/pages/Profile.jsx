import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dt9g6lw4r/upload"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "unsigned_preset_here"; // Replace with your unsigned upload preset name

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
            phone: fetchedUser.phone || "",
            nationality: fetchedUser.nationality || "",
            location: fetchedUser.location || { city: "", state: "", country: "" },
          });
          setProfileImage(fetchedUser.profilePicture || null);

          localStorage.setItem("profileData", JSON.stringify(fetchedUser));
        } else {
          toast.error(response.data.message);
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
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formDataCloud,
      });
      const data = await res.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Cloudinary upload error", error);
      toast.error("Image upload failed");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    const updatedProfile = {
      userId: user._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality,
      location: formData.location,
      profilePicture: profileImage,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        updatedProfile,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setUser(response.data.user);
        setIsEditing(false);
        localStorage.setItem("profileData", JSON.stringify(response.data.user));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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
    <div className="profile-page flex flex-col items-center p-6 sm:p-12 min-h-screen text-gray-900">
      <div className="profile-card bg-white rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row gap-8 p-8">
        {/* Left Content */}
        <div className="profile-left flex-1">
          <h3 className="text-2xl font-semibold mb-2">My Profile</h3>
          <h1 className="text-3xl font-bold mb-3">{user.name || "Your Name Here"}</h1>
          <p className="mb-6 text-gray-700 text-lg">
            Hey <span className="font-semibold">{user.name || "User"}</span>! Welcome to Shoppio.
          </p>

          <div className="user-stats grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">{user.phone || "N/A"}</p>
              <p className="text-gray-600 text-sm">Mobile Number</p>
            </div>
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">
                {user.location
                  ? `${user.location.city}, ${user.location.state}, ${user.location.country}`
                  : "N/A"}
              </p>
              <p className="text-gray-600 text-sm">Location</p>
            </div>
            <div className="stat-item p-4 bg-gray-100 rounded">
              <p className="font-semibold text-black text-lg">{user.nationality || "N/A"}</p>
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
        <div
          className="profile-right flex-shrink-0 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="profile-image-container w-52 h-52 rounded-full overflow-hidden border-2 border-gray-300 relative">
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/10061/10061438.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white">
              <FaEdit />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="edit-form-container mt-8 bg-white p-8 rounded-xl shadow-lg w-40 max-w-xl mx-auto">
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
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="Mobile Number"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <input
              type="text"
              name="city"
              value={formData.location.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: { ...prev.location, city: e.target.value },
                }))
              }
              placeholder="City"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <input
              type="text"
              name="state"
              value={formData.location.state}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: { ...prev.location, state: e.target.value },
                }))
              }
              placeholder="State"
              className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-black text-lg"
            />
            <input
              type="text"
              name="country"
              value={formData.location.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: { ...prev.location, country: e.target.value },
                }))
              }
              placeholder="Country"
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
                className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 font-medium text-lg transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-400 py-3 rounded hover:bg-gray-100 font-medium text-lg transition"
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
