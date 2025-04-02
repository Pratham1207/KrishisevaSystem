import React, { useState } from "react";
import "../styles/Warm.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface Warm {
  id: number;
  name: string;
  temperature: string;
  description: string;
}

const Warm: React.FC = () => {
  const [warmData, setWarmData] = useState<Warm[]>([
    {
      id: 1,
      name: "Tropical Climate",
      temperature: "25-35°C",
      description: "Hot and humid climate, ideal for tropical crops.",
    },
    {
      id: 2,
      name: "Temperate Climate",
      temperature: "10-25°C",
      description: "Moderate temperature, suitable for a variety of crops.",
    },
    {
      id: 3,
      name: "Arid Climate",
      temperature: "30-45°C",
      description: "Very dry and hot, requiring drought-resistant plants.",
    },
  ]);

  const [formData, setFormData] = useState<
    Omit<Warm, "id"> & { id: number | null }
  >({
    id: null,
    name: "",
    temperature: "",
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
      setWarmData((prev) =>
        prev.map((item) =>
          item.id === formData.id ? (formData as Warm) : item
        )
      );
      setIsEditing(false);
    } else {
      const newEntry: Warm = {
        ...(formData as Warm),
        id: warmData.length + 1,
      };
      setWarmData([...warmData, newEntry]);
    }
    setShowForm(false);
    setFormData({ id: null, name: "", temperature: "", description: "" });
  };

  const handleEdit = (climate: Warm) => {
    setFormData(climate);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setWarmData(warmData.filter((c) => c.id !== id));
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
        <h2 className="page-title">Manage Warm Details</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Climate
        </button>

        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Climate" : "Add Climate"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Climate Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="temperature"
                placeholder="Temperature Range"
                value={formData.temperature}
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
                <th>Warm Name</th>
                <th>Temperature</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warmData.map((climate) => (
                <tr key={climate.id}>
                  <td>{climate.id}</td>
                  <td>{climate.name}</td>
                  <td>{climate.temperature}</td>
                  <td>{climate.description}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(climate)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(climate.id)}
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

export default Warm;
