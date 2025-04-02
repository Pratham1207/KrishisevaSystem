import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Fertilizer.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface Fertilizer {
  id: number;
  name: string;
  type: string;
  quantity: string;
  price: string;
}

const Fertilizer: React.FC = () => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([
    { id: 1, name: "Urea", type: "Nitrogen", quantity: "50 kg", price: "$30" },
    { id: 2, name: "DAP", type: "Phosphorus", quantity: "40 kg", price: "$45" },
    { id: 3, name: "MOP", type: "Potassium", quantity: "30 kg", price: "$25" },
  ]);

  const [formData, setFormData] = useState<
    Omit<Fertilizer, "id"> & { id: number | null }
  >({
    id: null,
    name: "",
    type: "",
    quantity: "",
    price: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && formData.id !== null) {
      setFertilizers((prev) =>
        prev.map((f) =>
          f.id === formData.id ? { ...formData, id: formData.id } : f
        )
      );
      setIsEditing(false);
    } else {
      const newId =
        fertilizers.length > 0 ? fertilizers[fertilizers.length - 1].id + 1 : 1;
      setFertilizers((prev) => [...prev, { ...formData, id: newId }]);
    }

    setShowForm(false);
    setFormData({ id: null, name: "", type: "", quantity: "", price: "" });
  };

  const handleEdit = (fertilizer: Fertilizer) => {
    setFormData(fertilizer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setFertilizers((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="plant-page-wrapper">
      {/* Header */}
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

      {/* Content */}
      <div className="content">
        <h2 className="page-title">Manage Fertilizers</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Fertilizer
        </button>

        {/* Form */}
        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Fertilizer" : "Add Fertilizer"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
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

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fertilizers.map((fertilizer) => (
                <tr key={fertilizer.id}>
                  <td>{fertilizer.id}</td>
                  <td>{fertilizer.name}</td>
                  <td>{fertilizer.type}</td>
                  <td>{fertilizer.quantity}</td>
                  <td>{fertilizer.price}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(fertilizer)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(fertilizer.id)}
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

export default Fertilizer;
