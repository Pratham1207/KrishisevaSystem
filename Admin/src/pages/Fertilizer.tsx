import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/Header";
import "../styles/Fertilizer.css";

interface Fertilizer {
  _id?: string;
  name: string;
  type: string;
  quantity: string;
  unit: string;
  price: string;
}

const Fertilizer: React.FC = () => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [formData, setFormData] = useState<Fertilizer>({
    name: "",
    type: "",
    quantity: "",
    unit: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fertilizers");
      setFertilizers(res.data);
    } catch (error) {
      console.error("Error fetching fertilizers:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData._id) {
        await axios.put(
          `http://localhost:5000/fertilizers/update/${formData._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/fertilizers/add", formData);
      }
      resetForm();
      fetchFertilizers();
    } catch (error) {
      console.error("Error saving fertilizer:", error);
    }
  };

  const handleEdit = (fertilizer: Fertilizer) => {
    setFormData(fertilizer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this fertilizer?")) return;
    try {
      await axios.delete(`http://localhost:5000/fertilizers/delete/${id}`);
      fetchFertilizers();
    } catch (error) {
      console.error("Error deleting fertilizer:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", type: "", quantity: "", unit: "", price: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />
      <div className="content">
        <h2 className="page-title">Manage Fertilizers</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Fertilizer
        </button>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{isEditing ? "Edit Fertilizer" : "Add Fertilizer"}</h3>
              <form className="plant-form" onSubmit={handleSubmit}>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="unit"
                  placeholder="Unit (e.g., kg, L)"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
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

        <input
          type="text"
          placeholder="Search fertilizer by name..."
          className="form-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: "15px auto", maxWidth: "300px", display: "block" }}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fertilizers
                .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
                .map((fertilizer, index) => (
                  <tr key={fertilizer._id}>
                    <td>{index + 1}</td>
                    <td>{fertilizer.name}</td>
                    <td>{fertilizer.type}</td>
                    <td>{fertilizer.quantity}</td>
                    <td>{fertilizer.unit}</td>
                    <td>{fertilizer.price}</td>
                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(fertilizer)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(fertilizer._id)}>
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

export default Fertilizer;
