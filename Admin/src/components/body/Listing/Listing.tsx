import React from "react";
import "./listing.css";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import plant1 from "../../../Assets/plant1.png";
import plant2 from "../../../Assets/plant2.png";
import plant3 from "../../../Assets/plant3.png";
import plant4 from "../../../Assets/plant4.png";

const Listing = () => {
  return (
    <section className="lisitingSection" aria-labelledby="listing-heading">
      {/* Heading */}
      <div className="heading flex">
        <h2 id="listing-heading">My Listings</h2>
        <button
          className="btn flex"
          aria-label="See all plant listings"
        >
          See All <BsArrowRightShort className="icon" aria-hidden="true" />
        </button>
      </div>

      {/* Plant Listings */}
      <div className="secContainer flex">
        {/* Each card wrapped in article for better semantics */}
        <article className="singleItem" aria-label="Orchid Listing">
          <button className="icon-btn" aria-label="Remove Orchid from favorites">
            <AiFillHeart className="icon" />
          </button>
          <img src={plant1} alt="Potted Orchid plant" />
          <h3>Orchid</h3>
        </article>

        <article className="singleItem" aria-label="Spider Plant Listing">
          <button className="icon-btn" aria-label="Add Spider Plant to favorites">
            <AiOutlineHeart className="icon" />
          </button>
          <img src={plant2} alt="Spider plant in white ceramic pot" />
          <h3>Spider Plant</h3>
        </article>

        <article className="singleItem" aria-label="Coffee Plant Listing">
          <button className="icon-btn" aria-label="Add Coffee Plant to favorites">
            <AiOutlineHeart className="icon" />
          </button>
          <img src={plant3} alt="Coffee plant in a small pot" />
          <h3>Coffee Plant</h3>
        </article>

        <article className="singleItem" aria-label="Button Fern Listing">
          <button className="icon-btn" aria-label="Remove Button Fern from favorites">
            <AiFillHeart className="icon" />
          </button>
          <img src={plant4} alt="Button Fern on a table" />
          <h3>Button Fern</h3>
        </article>
      </div>
    </section>
  );
};

export default Listing;
