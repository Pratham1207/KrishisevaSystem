import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../styles/UserProfile.css";
import { toast } from "react-toastify";
import axios from "axios";
import { getAuthHeaders } from "../services/authHelper";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const userString = localStorage.getItem("user");
  const userObj: User | null = userString ? JSON.parse(userString) : null;

  const [profile, setProfile] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userObj) return;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/profile/${userObj._id}`,
          { headers: getAuthHeaders() }
        );
        setProfile(res.data);
      } catch (err: any) {
        setErrorMsg(err?.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const body = {
        name: profile.name,
        phone: profile.phone,
        ...(newPassword && { password: newPassword }),
      };

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/auth/profile/${profile._id}`,
        body,
        { headers: getAuthHeaders() }
      );

      toast.success("Profile updated successfully!");
      if (userObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userObj, name: profile.name })
        );
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="profile-container">
      <form
        onSubmit={handleSubmit}
        className="profile-form"
        aria-label="User Profile Form"
      >
        <h1>My Profile</h1>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={profile.email}
            disabled
            aria-disabled="true"
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={profile.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <input
            id="role"
            type="text"
            value={profile.role}
            disabled
            aria-disabled="true"
          />
        </div>

        <div>
          <label htmlFor="new-password">New Password (optional):</label>
          <input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
