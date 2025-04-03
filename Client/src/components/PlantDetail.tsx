import React from "react";
import LadyFingerImage from "../Assets/lady-finger.png";
import PotatoImage from "../Assets/potato.png";
import CarrotImage from "../Assets/carrot.png";
import BroccoliImage from "../Assets/broccoli.png";
import SpinachImage from "../Assets/spinach.png";
import TomatoImage from "../Assets/TomatoImage.png";
import CabbageImage from "../Assets/CabbageImage.png";
import CauliflowerImage from "../Assets/CauliflowerImage.png";
import OnionImage from "../Assets/OnionImage.png";

import "../styles/PlantDetails.css";

const recentPlants = [
  { name: "Lady Finger", image: LadyFingerImage },
  { name: "Potato", image: PotatoImage },
  { name: "Carrot", image: CarrotImage },
  { name: "Broccoli", image: BroccoliImage },
  { name: "Spinach", image: SpinachImage },
  { name: "Tomato", image: TomatoImage },
  { name: "Cabbage", image: CabbageImage },
  { name: "Cauliflower", image: CauliflowerImage },
  { name: "Onion", image: OnionImage },
];

const plants = [
  {
    name: "Lady Finger",
    description:
      "Lady Finger (Okra) is a warm-season vegetable known for its edible green seed pods. It is rich in fiber, vitamins, and minerals.",
    details: [
      { label: "Season", value: "Summer" },
      { label: "Plant Distance", value: "12-18 inches" },
      { label: "Fertilizer", value: "Compost and balanced fertilizer" },
      { label: "Fertilizer Time", value: "At planting and after flowering" },
      { label: "Temperature", value: "70-95°F" },
      { label: "Soil", value: "Well-drained, fertile soil" },
      { label: "Pesticide", value: "Neem Oil or organic pesticide" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "50-65 Days" },
      { label: "Warm", value: "Full Sunlight" },
    ],
  },
  {
    name: "Potato",
    description:
      "Potatoes are starchy tubers widely cultivated for food. They thrive in cool weather and are a staple crop globally.",
    details: [
      { label: "Season", value: "Spring or Fall" },
      { label: "Plant Distance", value: "10-12 inches" },
      { label: "Fertilizer", value: "Balanced fertilizer (10-10-10)" },
      { label: "Fertilizer Time", value: "At planting and during growth" },
      { label: "Temperature", value: "60-70°F" },
      { label: "Soil", value: "Well-drained, loamy soil" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "90-120 Days" },
      { label: "Warm", value: "Cool Climate" },
    ],
  },
  {
    name: "Carrot",
    description:
      "Carrots are root vegetables known for their bright orange color and high vitamin A content. They thrive in cool weather.",
    details: [
      { label: "Season", value: "Spring, Fall" },
      { label: "Plant Distance", value: "2-3 inches" },
      { label: "Fertilizer", value: "Compost or balanced fertilizer" },
      { label: "Fertilizer Time", value: "At planting" },
      { label: "Temperature", value: "55-75°F" },
      { label: "Soil", value: "Loose, sandy loam" },
      { label: "Pesticide", value: "Neem Oil or organic insecticides" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "70-80 Days" },
      { label: "Warm", value: "Partial Sun" },
    ],
  },
  {
    name: "Broccoli",
    description:
      "Broccoli is a nutrient-dense vegetable known for its edible green florets. It thrives in cool weather.",
    details: [
      { label: "Season", value: "Spring, Fall" },
      { label: "Plant Distance", value: "18-24 inches" },
      { label: "Fertilizer", value: "Balanced fertilizer (10-10-10)" },
      { label: "Fertilizer Time", value: "At planting and after 3 weeks" },
      { label: "Temperature", value: "60-70°F" },
      { label: "Soil", value: "Well-drained, fertile soil" },
      { label: "Pesticide", value: "Neem Oil or Bacillus thuringiensis" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "70-100 Days" },
      { label: "Warm", value: "Partial Sun" },
    ],
  },
  {
    name: "Spinach",
    description:
      "Spinach is a nutrient-rich leafy green vegetable known for its versatility and health benefits.",
    details: [
      { label: "Season", value: "Winter" },
      { label: "Plant Distance", value: "4-6 inches" },
      { label: "Fertilizer", value: "Organic Compost" },
      {
        label: "Fertilizer Time",
        value: "At planting and midway through growth",
      },
      { label: "Temperature", value: "50-70°F" },
      { label: "Soil", value: "Loamy, well-drained soil" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "40-50 Days" },
      { label: "Warm", value: "Mild Climate" },
    ],
  },
  {
    name: "Tomato",
    description:
      "Tomatoes are popular garden vegetables, grown for their juicy red fruits. They need warm weather and ample sunlight.",
    details: [
      { label: "Season", value: "Summer" },
      { label: "Plant Distance", value: "24-36 inches" },
      { label: "Fertilizer", value: "Balanced fertilizer (5-10-10)" },
      { label: "Fertilizer Time", value: "At planting and during flowering" },
      { label: "Temperature", value: "70-85°F" },
      { label: "Soil", value: "Well-drained, rich loam" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "60-80 Days" },
      { label: "Warm", value: "Full Sunlight" },
    ],
  },
  {
    name: "Cabbage",
    description:
      "Cabbage is a leafy green or purple vegetable that grows best in cool weather.",
    details: [
      { label: "Season", value: "Spring, Fall" },
      { label: "Plant Distance", value: "12-18 inches" },
      { label: "Fertilizer", value: "Balanced fertilizer" },
      { label: "Fertilizer Time", value: "At planting and after 4 weeks" },
      { label: "Temperature", value: "55-75°F" },
      { label: "Soil", value: "Moist, well-drained soil" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "70-120 Days" },
      { label: "Warm", value: "Partial Sun" },
    ],
  },
  {
    name: "Cauliflower",
    description:
      "Cauliflower is a versatile vegetable known for its edible white curd. It grows best in cool temperatures.",
    details: [
      { label: "Season", value: "Spring, Fall" },
      { label: "Plant Distance", value: "18-24 inches" },
      { label: "Fertilizer", value: "Balanced fertilizer" },
      { label: "Fertilizer Time", value: "At planting and after 3 weeks" },
      { label: "Temperature", value: "60-70°F" },
      { label: "Soil", value: "Well-drained, fertile soil" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "As needed" },
      { label: "Growth Time", value: "60-85 Days" },
      { label: "Warm", value: "Partial Sun" },
    ],
  },

  {
    name: "Onion",
    description:
      "Onions are versatile root vegetables used worldwide for their pungent flavor. They are easy to grow and store well after harvesting.",
    details: [
      { label: "Season", value: "Spring, Fall" },
      { label: "Plant Distance", value: "4-6 inches" },
      { label: "Fertilizer", value: "Nitrogen-rich fertilizer" },
      { label: "Fertilizer Time", value: "At planting and after 4 weeks" },
      { label: "Temperature", value: "55-75°F" },
      { label: "Soil", value: "Loamy, well-drained soil" },
      { label: "Pesticide", value: "Neem Oil or sulfur-based pesticide" },
      { label: "Pesticide Dose", value: "As needed (based on pests)" },
      { label: "Growth Time", value: "90-120 Days" },
      { label: "Warm", value: "Full Sunlight" },
    ],
  },
  {
    name: "Cherry Tomato",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making...",
    details: [
      { label: "Season", value: "Summer" },
      { label: "Plant Distance", value: "24-60 inches (2-5 feet)" },
      { label: "Fertilizer", value: "Organic" },
      { label: "Fertilizer Time", value: "10 Days" },
      { label: "Temperature", value: "65-85°F" },
      { label: "Soil", value: "Well-Draining, Rich Loam" },
      { label: "Pesticide", value: "Neem Oil" },
      { label: "Pesticide Dose", value: "0.1-0.5 Kg" },
      { label: "Growth Time", value: "50-75 Days" },
      { label: "Warm", value: "Full Sunlight" },
    ],
  },
];

const PlantDetail: React.FC = () => {
  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-lg-3 mb-4">
          <h4>Recent Plants</h4>
          <ul className="list-group">
            {recentPlants.map((plant, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex align-items-center"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="img-thumbnail me-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <span>{plant.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Plant Info */}
        <section className="col-lg-9">
          <h2 className="mb-3">Plant Information</h2>
          {plants.map((plant, idx) => (
            <div key={idx} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{plant.name}</h5>
                <p className="card-text">{plant.description}</p>
                <ul className="list-group list-group-flush">
                  {plant.details.map((detail, i) => (
                    <li key={i} className="list-group-item">
                      <strong>{detail.label}:</strong> {detail.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PlantDetail;
