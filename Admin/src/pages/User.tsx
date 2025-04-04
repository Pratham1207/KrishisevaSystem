import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";
import Header from "../components/Header";

interface User {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  role: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/all-users");
      setUsers(res.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/auth/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="plant-page-wrapper">
      <Header />

      <div className="content">
        <h2 className="page-title">Manage Users</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u) =>
                  u.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone || "-"}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="action-buttons">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
