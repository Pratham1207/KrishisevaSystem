import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface Soil {
  id: number;
  name: string;
  ph: string;
  description: string;
}

const Soil: React.FC = () => {
  const [soils, setSoils] = useState<Soil[]>([
    {
      id: 1,
      name: "Clay Soil",
      ph: "5.5 - 7.0",
      description: "Heavy soil that retains moisture well.",
    },
    {
      id: 2,
      name: "Sandy Soil",
      ph: "5.5 - 6.5",
      description: "Light soil with fast drainage.",
    },
    {
      id: 3,
      name: "Loamy Soil",
      ph: "6.0 - 7.5",
      description: "Ideal soil for most plants with good fertility.",
    },
  ]);

  const [formData, setFormData] = useState<
    Omit<Soil, "id"> & { id: number | null }
  >({
    id: null,
    name: "",
    ph: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setSoils(
        soils.map((s) => (s.id === formData.id ? (formData as Soil) : s))
      );
      setIsEditing(false);
    } else {
      setSoils([...soils, { ...(formData as Soil), id: soils.length + 1 }]);
    }

    setShowForm(false);
    setFormData({ id: null, name: "", ph: "", description: "" });
  };

  const handleEdit = (soil: Soil) => {
    setFormData(soil);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setSoils(soils.filter((s) => s.id !== id));
  };

  return (
    <div className="plant-page-wrapper">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Krishiseva</h1>
          <p>Hello Admin, Welcome back!</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotificationsNone className="icon" />
          <div className="adminImage">
            <img src={img} alt="Admin Profile" />
          </div>
        </div>
      </div>

      <div className="content">
        <h2 className="page-title">Manage Soils</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
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
              <button type="button" onClick={() => setShowForm(false)}>
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
              {soils.map((soil) => (
                <tr key={soil.id}>
                  <td>{soil.id}</td>
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
                      onClick={() => handleDelete(soil.id)}
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
