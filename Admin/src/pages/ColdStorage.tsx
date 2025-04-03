import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface ColdStorageItem {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
  status: "Active" | "Not Active";
}

const ColdStorage: React.FC = () => {
  const [coldStorages, setColdStorages] = useState<ColdStorageItem[]>([
    {
      id: 1,
      name: "Arctic Fresh Storage",
      contact: "+1234567890",
      email: "arctic@example.com",
      address: "123 Frost Lane, Toronto",
      status: "Active",
    },
    {
      id: 2,
      name: "Polar Cold Hub",
      contact: "+0987654321",
      email: "polar@example.com",
      address: "456 Iceberg St, Ottawa",
      status: "Not Active",
    },
    {
      id: 3,
      name: "Chill Zone Storage",
      contact: "+1122334455",
      email: "chillzone@example.com",
      address: "789 Glacier Ave, Vancouver",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState<ColdStorageItem>({
    id: 0,
    name: "",
    contact: "",
    email: "",
    address: "",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setColdStorages((prev) =>
        prev.map((storage) => (storage.id === formData.id ? formData : storage))
      );
      setIsEditing(false);
    } else {
      const newId =
        coldStorages.length > 0
          ? coldStorages[coldStorages.length - 1].id + 1
          : 1;
      setColdStorages((prev) => [...prev, { ...formData, id: newId }]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      contact: "",
      email: "",
      address: "",
      status: "Active",
    });
  };

  const handleEdit = (storage: ColdStorageItem) => {
    setFormData(storage);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setColdStorages((prev) => prev.filter((storage) => storage.id !== id));
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
        <h2 className="page-title">Manage Cold Storages</h2>

        {}
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Cold Storage
        </button>

        {}
        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit Cold Storage" : "Add Cold Storage"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Storage Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
              </select>
              <button type="submit">{isEditing ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Storage Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coldStorages.map((storage) => (
                <tr key={storage.id}>
                  <td>{storage.id}</td>
                  <td>{storage.name}</td>
                  <td>{storage.contact}</td>
                  <td>{storage.email}</td>
                  <td>{storage.address}</td>
                  <td
                    className={
                      storage.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {storage.status}
                  </td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(storage)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(storage.id)}
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

export default ColdStorage;
