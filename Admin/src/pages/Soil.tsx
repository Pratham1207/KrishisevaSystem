import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";
import {
  getAllSoils,
  createSoil,
  updateSoil,
  deleteSoil,
} from "../api/soilAPI";
import Header from "../components/Header";

interface Soil {
  _id?: string;
  name: string;
  ph: string;
  description: string;
}

const Soil: React.FC = () => {
  const [soils, setSoils] = useState<Soil[]>([]);
  const [formData, setFormData] = useState<Soil>({
    name: "",
    ph: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSoils = async () => {
    const data = await getAllSoils();
    setSoils(data);
  };

  useEffect(() => {
    fetchSoils();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await updateSoil(editingId, formData);
      } else {
        await createSoil(formData);
      }
      await fetchSoils();
      setFormData({ name: "", ph: "", description: "" });
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (soil: Soil) => {
    setFormData({
      name: soil.name,
      ph: soil.ph,
      description: soil.description,
    });
    setEditingId(soil._id || null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await deleteSoil(id);
      fetchSoils();
    }
  };

  const resetForm = () => {
    setFormData({ name: "", ph: "", description: "" });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />

      <div className="content">
        <h2 className="page-title">Manage Soils</h2>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Add Soil
        </button>

        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Soil" : "Add Soil"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Soil Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="ph"
                placeholder="pH Level"
                value={formData.ph}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
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
                <th>Soil Name</th>
                <th>pH Level</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {soils.map((soil, index) => (
                <tr key={soil._id}>
                  <td>{index + 1}</td>
                  <td>{soil.name}</td>
                  <td>{soil.ph}</td>
                  <td>{soil.description}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(soil)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(soil._id)}
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

export default Soil;
