import React from "react";
import "./activity.css";
import { BsArrowRightShort } from "react-icons/bs";

import img4 from "../../../Assets/user1.png";
import img5 from "../../../Assets/user2.png";
import img6 from "../../../Assets/user3.png";
import img7 from "../../../Assets/user4.png";
import img8 from "../../../Assets/user5.png";

interface Customer {
  id: number;
  name: string;
  action: string;
  time: string;
  image: string;
}

const recentActivities: Customer[] = [
  {
    id: 1,
    name: "Brandy Due",
    action: "Ordered a new plant",
    time: "2 min ago",
    image: img4,
  },
  {
    id: 2,
    name: "Brandy Due",
    action: "Ordered a new plant",
    time: "2 min ago",
    image: img5,
  },
  {
    id: 3,
    name: "Brandy Due",
    action: "Ordered a new plant",
    time: "2 min ago",
    image: img6,
  },
  {
    id: 4,
    name: "Brandy Due",
    action: "Ordered a new plant",
    time: "2 min ago",
    image: img7,
  },
  {
    id: 5,
    name: "Brandy Due",
    action: "Ordered a new plant",
    time: "2 min ago",
    image: img8,
  },
];

const Activity: React.FC = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className="btn flex" aria-label="View all activities">
          See All
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        {recentActivities.map((customer) => (
          <div className="singleCustomer flex" key={customer.id}>
            <img src={customer.image} alt={`${customer.name}'s profile`} />
            <div className="customerDetails">
              <span className="name">{customer.name}</span>
              <small>{customer.action}</small>
            </div>
            <div className="duration">{customer.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
