import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Pesticides.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface Pesticide {
  id: number;
  name: string;
  type: string;
  quantity: string;
  price: string;
}

const Pesticides: React.FC = () => {
  const [pesticides, setPesticides] = useState<Pesticide[]>([
    {
      id: 1,
      name: "Malathion",
      type: "Insecticide",
      quantity: "5 Liters",
      price: "$40",
    },
    {
      id: 2,
      name: "Chlorpyrifos",
      type: "Insecticide",
      quantity: "3 Liters",
      price: "$35",
    },
    {
      id: 3,
      name: "Glyphosate",
      type: "Herbicide",
      quantity: "10 Liters",
      price: "$50",
    },
  ]);

  const [formData, setFormData] = useState<
    Omit<Pesticide, "id"> & { id: number | null }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && formData.id !== null) {
      setPesticides((prev) =>
        prev.map((p) =>
          p.id === formData.id ? { ...formData, id: formData.id } : p
        )
      );
      setIsEditing(false);
    } else {
      const newId =
        pesticides.length > 0 ? pesticides[pesticides.length - 1].id + 1 : 1;
      setPesticides((prev) => [...prev, { ...formData, id: newId }]);
    }

    setFormData({ id: null, name: "", type: "", quantity: "", price: "" });
    setShowForm(false);
  };

  const handleEdit = (pesticide: Pesticide) => {
    setFormData(pesticide);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPesticides((prev) => prev.filter((p) => p.id !== id));
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

      {/* Main Content */}
      <div className="content">
        <h2 className="page-title">Manage Pesticides</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Pesticide
        </button>

        {/* Form Section */}
        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Pesticide" : "Add Pesticide"}</h3>
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

        {/* Table Section */}
        <div className="table-container">
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
              {pesticides.map((pesticide) => (
                <tr key={pesticide.id}>
                  <td>{pesticide.id}</td>
                  <td>{pesticide.name}</td>
                  <td>{pesticide.type}</td>
                  <td>{pesticide.quantity}</td>
                  <td>{pesticide.price}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(pesticide)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(pesticide.id)}
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

export default Pesticides;
