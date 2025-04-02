import React from "react";
import "./listing.css";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import plant1 from "../../../Assets/plant1.png";
import plant2 from "../../../Assets/plant2.png";
import plant3 from "../../../Assets/plant3.png";
import plant4 from "../../../Assets/plant4.png";

import user1 from "../../../Assets/user1.png";
import user2 from "../../../Assets/user2.png";
import user3 from "../../../Assets/user3.png";
import user4 from "../../../Assets/user4.png";

const Listing = () => {
  return (
    <section className="lisitingSection">
      {/* Heading */}
      <div className="heading flex">
        <h1>My Listings</h1>
        <button className="btn flex">
          See All <BsArrowRightShort className="icon" />
        </button>
      </div>

      {/* Plant Listings */}
      <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={plant1} alt="Orchid" />
          <h3>Orchid</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={plant2} alt="Spider Plant" />
          <h3>Spider Plant</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={plant3} alt="Coffee Plant" />
          <h3>Coffee Plant</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={plant4} alt="Button Fern" />
          <h3>Button Fern</h3>
        </div>
      </div>

      {/* Sellers Section */}
      <div className="sellers flex">
        {/* Top Sellers */}
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Sellers</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="User" />
              <img src={user2} alt="User" />
              <img src={user3} alt="User" />
              <img src={user4} alt="User" />
            </div>
            <div className="cardText">
              <span>
                14,554 Plants sold <br />
                <small>
                  21 Sellers <span className="date">Last 7 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        {/* Featured Sellers */}
        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Sellers</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user4} alt="User" />
              <img src={user3} alt="User" />
              <img src={user2} alt="User" />
              <img src={user1} alt="User" />
            </div>
            <div className="cardText">
              <span>
                28,554 Plants sold <br />
                <small>
                  26 Sellers <span className="date">Last 31 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
