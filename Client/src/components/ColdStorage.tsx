import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerImage from "../Assets/banner.png";
import "../styles/ColdStorage.css";
import { toast } from "react-toastify";

interface ColdStorageItem {
  _id: string;
  name: string;
  description: string;
  contact: string;
  address: string;
  size: string;
  photo: string;
}

const ColdStorage: React.FC = () => {
  const [storages, setStorages] = useState<ColdStorageItem[]>([]);
  const [search, setSearch] = useState("");

  const fetchColdStorages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/cold-storages`
      );
      setStorages(res.data);
    } catch (err) {
      toast.error("Failed to fetch cold storages");
    }
  };

  useEffect(() => {
    fetchColdStorages();
  }, []);

  const filteredStorages = storages.filter((s) =>
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="banner">
        <img
          src={BannerImage}
          alt="Coldstorage Banner"
          className="banner-image"
        />
        <h1 className="banner-title">Cold Storage</h1>
      </div>

      <div className="content-grid">
        <div>
          {filteredStorages.map((storage) => (
            <div className="store-card card" key={storage._id}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${storage.photo}`}
                className="img-fluid rounded-start"
                alt={storage.name}
              />
              <div className="card-body">
                <h1 className="card-title">{storage.name}</h1>
                <hr />
                <p className="card-text">{storage.description}</p>
                <p>
                  <strong>Size:</strong> {storage.size}
                </p>
                <p>
                  <strong>Contact:</strong> {storage.contact}
                </p>
                <p>
                  <strong>Address:</strong> {storage.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="search-section card">
          <h3 className="search">Search</h3>
          <hr />
          <input
            type="text"
            placeholder="Search Store by Address"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="buttons">
            <button className="search-btn">Search</button>
            <button className="reset-btn" onClick={() => setSearch("")}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdStorage;
