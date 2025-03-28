import React from "react";
import BannerImage from "../Assets/banner.png";
import ColdStorageImage from "../Assets/coldstorage1.png";
import "../styles/ColdStorage.css";

const ColdStorage: React.FC = () => {
  return (
    <div className="container">
      <div className="banner">
        <img
          src={BannerImage}
          alt="Coldstorage Banner"
          className="banner-image"
        />
        <h1 className="banner-title">Coldstorage</h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="store-card card">
            <img
              src={ColdStorageImage}
              className="img-fluid rounded-start"
              alt="Arctic Chill Logistics"
            />
            <div className="card-body">
              <h1 className="card-title">Arctic Chill Logistics</h1>
              <hr />
              <p className="card-text">
                Arctic Chill Logistics is a state-of-the-art cold storage
                facility specializing in temperature-controlled warehousing and
                distribution solutions...
              </p>
            </div>
          </div>
          <div className="store-card card">
            <img
              src={ColdStorageImage}
              className="img-fluid rounded-start"
              alt="Arctic Chill Logistics"
            />
            <div className="card-body">
              <h1 className="card-title">Arctic Chill Logistics</h1>
              <hr />
              <p className="card-text">
                Arctic Chill Logistics is a state-of-the-art cold storage
                facility specializing in temperature-controlled warehousing and
                distribution solutions...
              </p>
            </div>
          </div>
        </div>

        <div className="search-section card">
          <h3 className="search">Search</h3>
          <hr />
          <input
            type="text"
            placeholder="Search Store by Pincode"
            className="search-input"
          />
          <div className="buttons">
            <button className="search-btn">Search</button>
            <button className="reset-btn">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdStorage;
