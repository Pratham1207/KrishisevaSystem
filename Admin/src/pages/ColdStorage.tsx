import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/Header";
import "../styles/ColdStorage.css";

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
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cold-storages/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStorages(res.data);
    } catch (err) {
      console.error("Error fetching storages:", err);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (photo) data.append("photo", photo);

    try {
      const url = isEditing && editingId
        ? `${process.env.REACT_APP_BACKEND_URL}/cold-storages/update/${editingId}`
        : `${process.env.REACT_APP_BACKEND_URL}/cold-storages/add`;

      const method = isEditing ? axios.put : axios.post;
      await method(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
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
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cold-storages/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStorages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", contact: "", address: "", size: "" });
    setPhoto(null);
    setEditingId(null);
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />

      <main className="content">
        <h2 className="page-title">Manage Cold Storages</h2>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
          aria-label="Add Cold Storage"
        >
          <FaPlus aria-hidden="true" /> Add Cold Storage
        </button>

        {showForm && (
          <section className="form-container" aria-label="Cold Storage Form">
            <h3 id="form-title">{isEditing ? "Edit Cold Storage" : "Add Cold Storage"}</h3>
            <form onSubmit={handleSubmit} role="form" aria-labelledby="form-title">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} required />

              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

              <label htmlFor="contact">Contact Number</label>
              <input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />

              <label htmlFor="address">Address</label>
              <input id="address" name="address" value={formData.address} onChange={handleChange} required />

              <label htmlFor="size">Storage Size</label>
              <input id="size" name="size" value={formData.size} onChange={handleChange} required />

              <label htmlFor="photo">Upload Photo</label>
              <input id="photo" type="file" accept="image/*" onChange={handleFileChange} />

              <div className="form-actions">
                <button type="submit">{isEditing ? "Update" : "Add"}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </section>
        )}

        <div className="table-wrapper" role="table" aria-label="Cold Storage List">
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
                        alt={`Photo of ${s.name}`}
                        width="60"
                      />
                    )}
                  </td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(s)}
                      aria-label={`Edit ${s.name}`}
                    >
                      <FaEdit aria-hidden="true" /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(s._id)}
                      aria-label={`Delete ${s.name}`}
                    >
                      <FaTrash aria-hidden="true" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="cold-cards-mobile" aria-label="Mobile View Cards">
          {storages.map((s, index) => (
            <article key={s._id} className="mobile-cold-card">
              <h4>{index + 1}. {s.name}</h4>
              <p><strong>Contact:</strong> {s.contact}</p>
              <p><strong>Size:</strong> {s.size}</p>
              <p><strong>Address:</strong> {s.address}</p>
              {s.photo && <img src={`http://localhost:5000${s.photo}`} alt={`Photo of ${s.name}`} />}
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(s)} aria-label={`Edit ${s.name}`}><FaEdit /> Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)} aria-label={`Delete ${s.name}`}><FaTrash /> Delete</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ColdStorage;
