import React, { useEffect, useState } from "react";
import "../styles/Warm.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";
import {
  getAllInsects,
  createInsect,
  updateInsect,
  deleteInsect,
} from "../api/insectAPI";
import Header from "../components/Header";

interface Insect {
  _id?: string;
  name: string;
  pesticide: string;
}

const Warm: React.FC = () => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [formData, setFormData] = useState<Insect>({
    name: "",
    pesticide: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchInsects = async () => {
    const data = await getAllInsects();
    setInsects(data);
  };

  useEffect(() => {
    fetchInsects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await updateInsect(editingId, formData);
      } else {
        await createInsect(formData);
      }
      await fetchInsects();
      setFormData({ name: "", pesticide: "" });
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (insect: Insect) => {
    setFormData({ name: insect.name, pesticide: insect.pesticide });
    setEditingId(insect._id || null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await deleteInsect(id);
      fetchInsects();
    }
  };

  const resetForm = () => {
    setFormData({ name: "", pesticide: "" });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />

      <div className="content">
        <h2 className="page-title">Manage Insects</h2>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Add Insect
        </button>

        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Insect" : "Add Insect"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Insect Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="pesticide"
                placeholder="Pesticide Used"
                value={formData.pesticide}
                onChange={handleChange}
                required
              />
              <button type="submit">{isEditing ? "Update" : "Add"}</button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Insect Name</th>
                <th>Pesticide</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {insects.map((insect, index) => (
                <tr key={insect._id}>
                  <td>{index + 1}</td>
                  <td>{insect.name}</td>
                  <td>{insect.pesticide}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(insect)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(insect._id)}
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
        <div className="warm-cards-mobile">
          {insects.map((insect, index) => (
            <div key={insect._id} className="mobile-warm-card">
              <h4>{index + 1}. {insect.name}</h4>
              <p><strong>Pesticide:</strong> {insect.pesticide}</p>
              <div className="mobile-warm-actions">
                <button className="edit-btn" onClick={() => handleEdit(insect)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(insect._id)}>
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

export default Warm;
