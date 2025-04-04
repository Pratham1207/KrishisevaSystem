import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../styles/Plant.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/Header";
import { toast } from "react-toastify";

interface DropdownOption {
  _id: string;
  name: string;
}

const Plant: React.FC = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    season: "",
    distance: "",
    growthTime: "",
    temperature: "",
    fertilizer: "",
    fertilizerTime: "",
    pesticide: "",
    pesticideDose: "",
    soil: "",
    warm: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [fertilizers, setFertilizers] = useState<DropdownOption[]>([]);
  const [soils, setSoils] = useState<DropdownOption[]>([]);
  const [pesticides, setPesticides] = useState<DropdownOption[]>([]);
  const [warms, setWarms] = useState<DropdownOption[]>([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchPlants();
    fetchDropdowns();
  }, []);

  const fetchPlants = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/plants`);
    setPlants(res.data);
  };

  const fetchDropdowns = async () => {
    const [fRes, sRes, pRes, wRes] = await Promise.all([
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/fertilizers`),
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/soil`),
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/pesticides`),
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/insects`),
    ]);
    setFertilizers(fRes.data);
    setSoils(sRes.data);
    setPesticides(pRes.data);
    setWarms(wRes.data);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) =>
      data.append(key, val as string)
    );
    if (image) data.append("image", image);

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/plants/update/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Plant updated successfully");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/plants/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Plant added successfully");
      }

      fetchPlants();
      handleCloseForm();
      setShowForm(false);
    } catch (err) {
      toast.error("Failed to submit plant");
      console.error(err);
    }
  };

  const handleEdit = (plant: any) => {
    setFormData({
      name: plant.name,
      description: plant.description,
      season: plant.season,
      distance: plant.distance,
      growthTime: plant.growthTime,
      fertilizer: plant.fertilizer?._id,
      fertilizerTime: plant.fertilizerTime,
      temperature: plant.temperature,
      soil: plant.soil?._id,
      pesticide: plant.pesticide?._id,
      pesticideDose: plant.pesticideDose,
      warm: plant.warm?._id,
    });
    setEditingId(plant._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/plants/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Plant deleted");
    fetchPlants();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      season: "",
      distance: "",
      growthTime: "",
      temperature: "",
      fertilizer: "",
      fertilizerTime: "",
      pesticide: "",
      pesticideDose: "",
      soil: "",
      warm: "",
    });
    setImage(null);
    setEditingId(null);
    setIsEditing(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <div className="plant-page-wrapper">
      <Header />
      <div className="content">
        <h2 className="page-title">Manage Plants</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Plant
        </button>

        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
              >
                <option value="">Select Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </select>
              <input
                name="distance"
                placeholder="Distance (cm)"
                value={formData.distance}
                onChange={handleInputChange}
              />
              <input
                name="growthTime"
                placeholder="Growth Time (days)"
                value={formData.growthTime}
                onChange={handleInputChange}
              />
              <select
                name="fertilizer"
                value={formData.fertilizer}
                onChange={handleInputChange}
              >
                <option value="">Select Fertilizer</option>
                {fertilizers.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>
              <input
                name="fertilizerTime"
                placeholder="Fertilizer Time"
                value={formData.fertilizerTime}
                onChange={handleInputChange}
              />
              <input
                name="temperature"
                placeholder="Temperature Range"
                value={formData.temperature}
                onChange={handleInputChange}
              />
              <select
                name="soil"
                value={formData.soil}
                onChange={handleInputChange}
              >
                <option value="">Select Soil</option>
                {soils.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                name="pesticide"
                value={formData.pesticide}
                onChange={handleInputChange}
              >
                <option value="">Select Pesticide</option>
                {pesticides.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                name="pesticideDose"
                placeholder="Pesticide Dose"
                value={formData.pesticideDose}
                onChange={handleInputChange}
              />
              <select
                name="warm"
                value={formData.warm}
                onChange={handleInputChange}
              >
                <option value="">Select Warm Climate</option>
                {warms.map((w) => (
                  <option key={w._id} value={w._id}>
                    {w.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditing}
              />
              <button type="submit">
                {isEditing ? "Update Plant" : "Add Plant"}
              </button>
              <button type="button" onClick={handleCloseForm}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Season</th>
                <th>Distance</th>
                <th>Growth Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant._id}>
                  <td>{plant.name}</td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${plant.image}`}
                      alt={plant.name}
                      width={50}
                    />
                  </td>
                  <td>{plant.season}</td>
                  <td>{plant.distance}</td>
                  <td>{plant.growthTime}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(plant)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(plant._id)}
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

export default Plant;
