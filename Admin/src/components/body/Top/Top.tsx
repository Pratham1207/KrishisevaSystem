import React from "react";
import "./top.css";

import { BsArrowRightShort, BsQuestionCircle } from "react-icons/bs";
import plantImage from "../../../assets/plant.png";
import videoBg from "../../../assets/video.mp4";
import Header from "../../Header";

const Top = ({ showCards = true }) => {
  return (
    <div className="topSection">
      <Header />

      {showCards && (
        <main className="cardSection flex">
          {/* Section: Product Hero */}
          <section className="rightCard flex" aria-labelledby="product-hero">
            <h1 id="product-hero">Create and sell extraordinary products</h1>
            <p>
              The world's fast-growing industry today is natural-made products!
            </p>
            <div className="buttons flex">
              <button className="btn" aria-label="Explore more natural-made products">
                Explore More
              </button>
              <button
                className="btn transparent"
                aria-label="View top selling natural-made products"
              >
                Top Sellers
              </button>
            </div>
            <div className="videoDiv" aria-hidden="true">
              <video src={videoBg} autoPlay loop muted />
            </div>
          </section>

          {/* Section: My Stat */}
          <section className="leftCard flex" aria-labelledby="mystat-heading">
            <div className="main flex">
              <div className="textDiv">
                <h2 id="mystat-heading">My Stat</h2>
                <div className="flex">
                  <span>
                    Today <br /> <small>4 Orders</small>
                  </span>
                  <span>
                    This Month <br /> <small>234 Orders</small>
                  </span>
                </div>
                <span className="flex link">
                  Go to my orders <BsArrowRightShort className="icon" aria-hidden="true" />
                </span>
              </div>

              <div className="imgDiv">
                <img
                  src={plantImage}
                  alt="Decorative plant on dashboard"
                />
              </div>

              <div className="sideBarCard">
                <BsQuestionCircle className="icon" aria-hidden="true" />
                <div className="cardContent">
                  <div className="circle1" aria-hidden="true"></div>
                  <div className="circle2" aria-hidden="true"></div>
                  <h3>Help Center</h3>
                  <p>
                    Having trouble in Krishiseva? Please contact us for more
                    questions.
                  </p>
                  <button className="btn" aria-label="Go to Help Center page">
                    Go to Help Center
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Top;
