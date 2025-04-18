import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/Header";
import "../styles/Pesticide.css";

interface Pesticide {
  _id?: string;
  name: string;
  dose: string;
  description: string;
}

const Pesticides: React.FC = () => {
  const [pesticides, setPesticides] = useState<Pesticide[]>([]);
  const [formData, setFormData] = useState<Pesticide>({
    name: "",
    dose: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const API_BASE = "http://localhost:5000/pesticides";

  useEffect(() => {
    fetchPesticides();
  }, []);

  const fetchPesticides = async () => {
    try {
      const response = await axios.get(API_BASE);
      setPesticides(response.data);
    } catch (error) {
      console.error("Error fetching pesticides:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData._id) {
        await axios.put(`${API_BASE}/update/${formData._id}`, formData);
      } else {
        await axios.post(`${API_BASE}/add`, formData);
      }
      fetchPesticides();
      resetForm();
    } catch (error) {
      console.error("Error saving pesticide:", error);
    }
  };

  const handleEdit = (pesticide: Pesticide) => {
    setFormData(pesticide);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this pesticide?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      fetchPesticides();
    } catch (error) {
      console.error("Error deleting pesticide:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", dose: "", description: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />
      <div className="content">
        <h2 className="page-title">Manage Pesticides</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Pesticide
        </button>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{isEditing ? "Edit Pesticide" : "Add Pesticide"}</h3>
              <form className="plant-form" onSubmit={handleSubmit}>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Pesticide Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="dose"
                  placeholder="Dose"
                  value={formData.dose}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="form-textarea"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <div className="form-buttons">
                  <button className="form-submit-btn" type="submit">
                    {isEditing ? "Update" : "Add"}
                  </button>
                  <button className="form-cancel-btn" type="button" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Dose</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pesticides
                .filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((pesticide, index) => (
                  <tr key={pesticide._id}>
                    <td>{index + 1}</td>
                    <td>{pesticide.name}</td>
                    <td>{pesticide.dose}</td>
                    <td>{pesticide.description}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(pesticide)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(pesticide._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {}
        <div className="pesticide-cards-mobile">
          {pesticides
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((pesticide, index) => (
              <div key={pesticide._id} className="mobile-pesticide-card">
                <h4>{index + 1}. {pesticide.name}</h4>
                <p><strong>Dose:</strong> {pesticide.dose}</p>
                <p><strong>Description:</strong> {pesticide.description}</p>
                <div className="mobile-pesticide-actions">
                  <button className="edit-btn" onClick={() => handleEdit(pesticide)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(pesticide._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pesticides;
