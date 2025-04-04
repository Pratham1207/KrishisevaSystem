import React, { useState } from "react";
import "../styles/AddColdStorage.css";

interface FormData {
  image: File | null;
  storageName: string;
  description: string;
  contactNo: string;
  storageSize: string;
}

const AddColdStorage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    storageName: "",
    description: "",
    contactNo: "",
    storageSize: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    image: "",
    storageName: "",
    description: "",
    contactNo: "",
    storageSize: "",
  });

  // Handle image file input change
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

  // Handle other input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storageName || !formData.description || !formData.contactNo || !formData.storageSize) {
      setErrors({ ...errors, general: "All fields are required." });
      return;
    }
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="add-cold-storage-container">
      <h2>Add Cold Storage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="storageName">Storage Name</label>
          <input type="text" id="storageName" name="storageName" value={formData.storageName} onChange={handleInputChange} />
          {errors.storageName && <p className="error-message">{errors.storageName}</p>}
        </div>
        
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="contactNo">Contact Number</label>
          <input type="text" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleInputChange} />
          {errors.contactNo && <p className="error-message">{errors.contactNo}</p>}
        </div>

        <div>
          <label htmlFor="storageSize">Storage Size</label>
          <input type="text" id="storageSize" name="storageSize" value={formData.storageSize} onChange={handleInputChange} />
          {errors.storageSize && <p className="error-message">{errors.storageSize}</p>}
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          {errors.image && <p className="error-message">{errors.image}</p>}
          {formData.image && (
            <div>
              <p>Selected file: {formData.image.name}</p>
              <img src={URL.createObjectURL(formData.image)} alt="Preview" width={100} />
            </div>
          )}
        </div>

        <button type="submit" className="add-cold-storage-button">Submit</button>
      </form>
      {errors.general && <p className="error-message">{errors.general}</p>}
    </div>
  );
};

export default AddColdStorage;

