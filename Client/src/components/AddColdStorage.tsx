import React, { useState } from "react";
import "../styles/AddColdStorage.css";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  image: File | null;
  name: string;
  description: string;
  contact: string;
  address: string;
  size: string;
}

const AddColdStorage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    name: "",
    description: "",
    contact: "",
    address: "",
    size: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Please upload a valid image file." });
      } else if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "File size must be less than 2MB." });
      } else {
        setFormData({ ...formData, image: file });
        setErrors({ ...errors, image: "" });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    for (const field of ["name", "description", "contact", "address", "size"]) {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = "This field is required.";
      }
    }
    if (!formData.image) newErrors.image = "Image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("contact", formData.contact);
      data.append("address", formData.address);
      data.append("size", formData.size);
      if (formData.image) {
        data.append("photo", formData.image);
      }

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/cold-storages/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Cold storage added successfully!");
      setFormData({
        image: null,
        name: "",
        description: "",
        contact: "",
        address: "",
        size: "",
      });
      setErrors({});
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="add-cold-storage-container">
      <h2>Add Cold Storage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Storage Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleInputChange}
        />
        {errors.contact && <p className="error-message">{errors.contact}</p>}

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        {errors.address && <p className="error-message">{errors.address}</p>}

        <input
          type="text"
          name="size"
          placeholder="Storage Size"
          value={formData.size}
          onChange={handleInputChange}
        />
        {errors.size && <p className="error-message">{errors.size}</p>}

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {errors.image && <p className="error-message">{errors.image}</p>}
        {formData.image && (
          <div>
            <p>Selected file: {formData.image.name}</p>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              width={100}
            />
          </div>
        )}

        <button type="submit" className="add-cold-storage-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddColdStorage;
