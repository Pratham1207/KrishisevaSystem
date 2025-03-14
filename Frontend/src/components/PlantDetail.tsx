import React from "react";

const PlantDetail: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Tost Tomato</h2>
      <p className="text-gray-600">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making...
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p>
            <strong>Season:</strong> Winter
          </p>
          <p>
            <strong>Plant Distance:</strong> 2 inch
          </p>
          <p>
            <strong>Fertilizer:</strong> Nitrogen1
          </p>
          <p>
            <strong>Fertilizer Time:</strong> 1 Day
          </p>
        </div>
        <div>
          <p>
            <strong>Temperature:</strong> 40
          </p>
          <p>
            <strong>Soil:</strong> Silt Oil
          </p>
          <p>
            <strong>Pesticide:</strong> Dimethoate
          </p>
          <p>
            <strong>Pesticide Dose:</strong> 0.22-12 Kg
          </p>
        </div>
      </div>
      <hr className="my-6" />

      <h2 className="text-2xl font-bold">Cherry Tomato</h2>
      <p className="text-gray-600">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making...
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p>
            <strong>Season:</strong> Summer
          </p>
          <p>
            <strong>Plant Distance:</strong> 24-60 (24-inches)
          </p>
          <p>
            <strong>Fertilizer:</strong> Organic
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
