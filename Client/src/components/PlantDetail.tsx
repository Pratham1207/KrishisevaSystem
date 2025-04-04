import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PlantDetails.css";

interface Plant {
  _id: string;
  name: string;
  image: string;
  description: string;
  season: string;
  distance: string;
  fertilizer: { name: string };
  fertilizerTime: string;
  temperature: string;
  soil: { name: string };
  pesticide: { name: string };
  pesticideDose: string;
  growthTime: string;
  warm: { name: string };
}

const PlantDetail: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/plants`
      );
      setPlants(res.data);
      setSelectedPlant(res.data[0]);
    } catch (err) {
      console.error("Error fetching plants", err);
    }
  };

  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <aside className="col-lg-3 col-md-4 mb-4" aria-label="Recent plants">
          <h4>Recent Plants</h4>
          <ul className="list-group">
            {plants.map((plant) => (
              <li
                key={plant._id}
                className={`list-group-item d-flex align-items-center ${
                  selectedPlant?._id === plant._id ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectPlant(plant)}
                aria-current={selectedPlant?._id === plant._id}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${plant.image}`}
                  alt={plant.name}
                  className="img-thumbnail me-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <span>{plant.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="col-lg-9 col-md-8">
          {selectedPlant && (
            <>
              <h2 className="mb-3">Plant Information</h2>
              <div className="card p-3">
                <div className="row g-4 align-items-center">
                  {/* Image section */}
                  <div className="col-md-4 text-center">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${selectedPlant.image}`}
                      alt={`${selectedPlant.name} image`}
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>

                  {/* Details section */}
                  <div className="col-md-8">
                    <h4>{selectedPlant.name}</h4>
                    <p>{selectedPlant.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Season:</strong> {selectedPlant.season}
                      </li>
                      <li className="list-group-item">
                        <strong>Plant Distance:</strong>{" "}
                        {selectedPlant.distance}
                      </li>
                      <li className="list-group-item">
                        <strong>Fertilizer:</strong>{" "}
                        {selectedPlant.fertilizer?.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Fertilizer Time:</strong>{" "}
                        {selectedPlant.fertilizerTime}
                      </li>
                      <li className="list-group-item">
                        <strong>Temperature:</strong>{" "}
                        {selectedPlant.temperature}
                      </li>
                      <li className="list-group-item">
                        <strong>Soil:</strong> {selectedPlant.soil?.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Pesticide:</strong>{" "}
                        {selectedPlant.pesticide?.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Pesticide Dose:</strong>{" "}
                        {selectedPlant.pesticideDose}
                      </li>
                      <li className="list-group-item">
                        <strong>Growth Time:</strong> {selectedPlant.growthTime}
                      </li>
                      <li className="list-group-item">
                        <strong>Warm:</strong> {selectedPlant.warm?.name}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlantDetail;
