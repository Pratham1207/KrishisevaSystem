import React from "react";
import "./top.css";

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BsArrowRightShort, BsQuestionCircle } from "react-icons/bs";

import userImage from "../../../assets/user.png";
import plantImage from "../../../assets/plant.png";
import videoBg from "../../../assets/video.mp4";
import Header from "../../Header";

const Top = ({ showCards = true }) => {
  return (
    <div className="topSection">
      <Header />

      {/* Hide cardSection when showCards is false */}
      {showCards && (
        <div className="cardSection flex">
          <div className="rightCard flex">
            <h1>Create and sell extraordinary products</h1>
            <p>
              The world's fast-growing industry today is natural-made products!
            </p>
            <div className="buttons flex">
              <button className="btn">Explore More</button>
              <button className="btn transparent">Top Sellers</button>
            </div>
            <div className="videoDiv">
              <video src={videoBg} autoPlay loop muted></video>
            </div>
          </div>

          <div className="leftCard flex">
            <div className="main flex">
              <div className="textDiv">
                <h1>My Stat</h1>
                <div className="flex">
                  <span>
                    Today <br /> <small>4 Orders</small>
                  </span>
                  <span>
                    This Month <br /> <small>234 Orders</small>
                  </span>
                </div>
                <span className="flex link">
                  Go to my orders <BsArrowRightShort className="icon" />
                </span>
              </div>

              <div className="imgDiv">
                <img src={plantImage} alt="Plant " />
              </div>

              <div className="sideBarCard">
                <BsQuestionCircle className="icon" />
                <div className="cardContent">
                  <div className="circle1"></div>
                  <div className="circle2"></div>
                  <h3>Help Center</h3>
                  <p>
                    Having trouble in Krishiseva? Please contact us for more
                    questions.
                  </p>
                  <button className="btn">Go to Help Center</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
