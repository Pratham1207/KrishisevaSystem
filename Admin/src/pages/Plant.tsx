import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../styles/Plant.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../../src/assets/user.png";

interface Plant {
  id: number | null;
  name: string;
  image: string;
  title: string;
  description: string;
  type: string;
  season: string;
  distance: string;
  price: string;
}

const Plant: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>(() => {
    const savedPlants = localStorage.getItem("plants");
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

  const [formData, setFormData] = useState<Plant>({
    id: null,
    name: "",
    image: "",
    title: "",
    description: "",
    type: "",
    season: "",
    distance: "",
    price: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const handleAddPlant = () => {
    setShowForm(true);
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      image: "",
      title: "",
      description: "",
      type: "",
      season: "",
      distance: "",
      price: "",
    });
  };

  const handleEdit = (plant: Plant) => {
    setShowForm(true);
    setIsEditing(true);
    setFormData(plant);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if ((name === "distance" || name === "price") && !/^\d*$/.test(value))
      return;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "image/png") {
      setError("Only PNG images are allowed.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Please upload a PNG image.");
      return;
    }
    if (!formData.season) {
      setError("Please select a season.");
      return;
    }
    if (isEditing) {
      setPlants(
        plants.map((plant) => (plant.id === formData.id ? formData : plant))
      );
    } else {
      setPlants([...plants, { ...formData, id: plants.length + 1 }]);
    }
    setShowForm(false);
    setError("");
  };

  const handleDelete = (id: number | null) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
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
        <h2 className="page-title">Manage Plants</h2>

        <button className="add-btn" onClick={handleAddPlant}>
          <FaPlus /> Add Plant
        </button>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Season</th>
                <th>Distance (cm)</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant.id!}>
                  <td>{plant.id}</td>
                  <td>
                    {plant.image && <img src={plant.image} alt={plant.name} />}
                  </td>
                  <td>{plant.name}</td>
                  <td>{plant.type}</td>
                  <td>{plant.season}</td>
                  <td>{plant.distance}</td>
                  <td>{plant.price}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(plant)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(plant.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <>
            <div className="overlay" onClick={() => setShowForm(false)}></div>
            <div className="form-container">
              <h3>{isEditing ? "Edit Plant" : "Add Plant"}</h3>
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Plant Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleImageUpload}
                  required={!isEditing}
                />
                {formData.image && <img src={formData.image} alt="Preview" />}
                <input
                  type="text"
                  name="title"
                  placeholder="Plant Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Plant Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Plant Type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Season</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
                <input
                  type="text"
                  name="distance"
                  placeholder="Plant Distance (cm)"
                  value={formData.distance}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Plant Price ($)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="submit-btn">
                  {isEditing ? "Update Plant" : "Add Plant"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Plant;
