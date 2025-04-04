import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/Header";

interface ColdStorageItem {
  _id?: string;
  name: string;
  description: string;
  contact: string;
  address: string;
  size: string;
  photo?: string;
}

const ColdStorage: React.FC = () => {
  const [storages, setStorages] = useState<ColdStorageItem[]>([]);
  const [formData, setFormData] = useState<ColdStorageItem>({
    name: "",
    description: "",
    contact: "",
    address: "",
    size: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("adminToken");

  const fetchStorages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/cold-storages/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStorages(res.data);
    } catch (err) {
      console.error("Error fetching storages:", err);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("contact", formData.contact);
    data.append("address", formData.address);
    data.append("size", formData.size);

    if (photo) data.append("photo", photo);

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/cold-storages/update/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/cold-storages/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setFormData({
        name: "",
        description: "",
        contact: "",
        address: "",
        size: "",
      });
      setPhoto(null);
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
      fetchStorages();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleEdit = (storage: ColdStorageItem) => {
    setFormData(storage);
    setEditingId(storage._id || null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/cold-storages/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchStorages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="plant-page-wrapper">
      <Header />
      <div className="content">
        <h2 className="page-title">Manage Cold Storages</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Cold Storage
        </button>

        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Cold Storage" : "Add Cold Storage"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                required
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Storage Size"
                required
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">{isEditing ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Size</th>
                <th>Address</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storages.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.contact}</td>
                  <td>{s.size}</td>
                  <td>{s.address}</td>
                  <td>
                    {s.photo && (
                      <img
                        src={`http://localhost:5000${s.photo}`}
                        alt={s.name}
                        width="60"
                      />
                    )}
                  </td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(s)}>
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(s._id)}
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

export default ColdStorage;
