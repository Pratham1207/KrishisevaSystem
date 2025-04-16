import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import "../styles/ColdStorage.css";

interface ColdStorageItem {
  _id?: string;
  name: string;
  description: string;
  contact: string;
  address: string;
  size: string;
  photo?: string;
}

const ColdStorage: React.FC = () => {
  const [storages, setStorages] = useState<ColdStorageItem[]>([]);
  const token = localStorage.getItem("adminToken");

  const fetchStorages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cold-storages/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStorages(res.data);
    } catch (err) {
      console.error("Error fetching storages:", err);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  return (
    <div className="plant-page-wrapper">
      <Header />
      <main className="content">
        <h2 className="page-title">Cold Storages</h2>

        <div className="table-wrapper" role="table" aria-label="Cold Storage List">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Size</th>
                <th>Address</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {storages.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.contact}</td>
                  <td>{s.size}</td>
                  <td>{s.address}</td>
                  <td>
                    {s.photo && (
                      <img
                        src={`http://localhost:5000${s.photo}`}
                        alt={`Photo of ${s.name}`}
                        width="60"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="cold-cards-mobile" aria-label="Mobile View Cards">
          {storages.map((s, index) => (
            <article key={s._id} className="mobile-cold-card">
              <h4>{index + 1}. {s.name}</h4>
              <p><strong>Contact:</strong> {s.contact}</p>
              <p><strong>Size:</strong> {s.size}</p>
              <p><strong>Address:</strong> {s.address}</p>
              {s.photo && <img src={`http://localhost:5000${s.photo}`} alt={`Photo of ${s.name}`} />}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ColdStorage;