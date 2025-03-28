import React from "react";
import { FiArrowRight } from "react-icons/fi";
import BannerBackground from "../Assets/home-banner-image.png";
import PickMeals from "../Assets/image1.png";
import ChooseMeals from "../Assets/image2.png";
import DeliveryMeals from "../Assets/image3.png";
import LeftImage from "../Assets/leftImage.png";
import PickMealsImage from "../Assets/pick-meals-image.png";
import ChooseMealsImage from "../Assets/choose-image.png";
import DeliveryMealsImage from "../Assets/delivery-image.png";

interface WorkInfo {
  image: string;
  title: string;
  text: string;
}

const HomeAboutWork: React.FC = () => {
  const workInfoData: WorkInfo[] = [
    {
      image: PickMealsImage,
      title: "Connect with Our Farmers",
      text: "Partner with farmers to promote sustainable agriculture and contribute to their success. Together, we can enhance food production and rural development.",
    },
    {
      image: ChooseMealsImage,
      title: "Expand Your Agricultural Reach",
      text: "Explore new ways to support and grow the farming industry through innovative partnerships and sustainable practices.",
    },
    {
      image: DeliveryMealsImage,
      title: "Making a Difference in Agriculture",
      text: "Your support helps create a positive impact on farming communities, promoting environmental sustainability and economic growth for future generations.",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="home-about-work-container">
      {/* <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button> */}
      {/* Home Section */}
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="Banner Background" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">Advancing Modern Agriculture</h1>
            <p className="primary-text">
              Our solutions help farmers, traders, and private businesses manage
              agricultural produce, ensuring better storage and supply chain
              efficiency.
            </p>
            <button className="secondary-button">
              More Info <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="work-section-wrapper2">
        <div className="work-section-top2">
          <p className="primary-text2">
            We are the first and only platform connecting individuals with
            farmers, enabling direct support for agricultural growth.
          </p>
        </div>
        <div className="work-section-bottom2">
          {[
            {
              image: PickMeals,
              title: "Fernando Soler",
              text: "Passionate about sustainable farming and modern agricultural practices, I specialize in developing innovative solutions to enhance crop yield and soil health.",
            },
            {
              image: ChooseMeals,
              title: "Ilone Pickford",
              text: "Committed to fostering agricultural growth and sustainability, I lead Agrogofund Groups in supporting farmers through innovative funding solutions.",
            },
            {
              image: DeliveryMeals,
              title: "Ed O’Brien",
              text: "With a deep understanding of medicinal plants and natural remedies, I specialize in cultivating and utilizing herbs and worms for health and wellness.",
            },
          ].map((data) => (
            <div className="work-section-info2" key={data.title}>
              <div className="info-boxes-img-container2">
                <img src={data.image} alt={data.title} />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>

        <div className="work-section-new">
          <div className="left-side">
            <img
              src={LeftImage}
              alt="Agriculture"
              className="background-image"
            />
            <h1>Transforming Agriculture</h1>
            <p>
              We are revolutionizing the way farmers and individuals connect to
              build a more sustainable and prosperous agricultural future.
            </p>
            <button>Learn More</button>
          </div>
          <div className="right-side">
            <h1>Our Vision</h1>
            <p>
              Our mission is to create long-lasting impact by fostering direct
              relationships between consumers and farmers, enabling a greener
              world.
            </p>
          </div>
        </div>
      </div>

      {/* Work Section */}
      <div className="work-section-wrapper">
        <div className="work-section-top">
          <h1 className="primary-heading">New Agricultural Opportunities</h1>
          <p className="primary-text">
            We are the first and only platform connecting individuals with
            farmers, enabling direct support for agricultural growth.
          </p>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data, index) => (
            <div
              className={`work-section-info ${
                index === 1 ? "center-info" : ""
              }`}
              key={data.title}
            >
              <div className="info-boxes-img-container">
                <img src={data.image} alt={data.title} />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAboutWork;
