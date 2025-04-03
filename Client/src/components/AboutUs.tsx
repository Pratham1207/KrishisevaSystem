import React from "react";
import VegetablesImage from "../Assets/vegetables-basket.png";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>Welcome to KrishiSeva</h1>
        <p>
          KrishiSeva is your one-stop platform dedicated to empowering farmers,
          traders, and consumers by providing reliable and up-to-date
          agricultural information. Our mission is to foster direct connections
          between farmers and end-users, ensuring transparency, fair pricing,
          and increased awareness about modern farming techniques.
        </p>

        <h2>What We Offer</h2>
        <p>Through KrishiSeva, you can access:</p>
        <ul>
          <li>
            Daily market prices from Neemuch, Mandsaur, and nearby districts.
          </li>
          <li>
            Real-time updates on crop prices, ensuring farmers get fair value
            for their produce.
          </li>
          <li>
            Information on new and innovative farming techniques tailored to
            Indian agricultural conditions.
          </li>
          <li>
            Guidance on government schemes, subsidies, and policies designed to
            support farmers and promote sustainable farming.
          </li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          We believe in building a sustainable future by bridging the gap
          between rural farmers and modern technology. Our goal is to empower
          farmers with knowledge, tools, and resources to increase their yield,
          reduce costs, and ensure their hard work translates into better
          income.
        </p>

        <h2>Why Choose KrishiSeva?</h2>
        <ul>
          <li>
            First-of-its-kind platform dedicated to agriculture-focused
            information and direct farmer-consumer engagement.
          </li>
          <li>
            Comprehensive crop data and growing techniques to help farmers adopt
            modern methods.
          </li>
          <li>
            Detailed breakdown of government schemes, making it easier for
            farmers to access support.
          </li>
          <li>
            Emphasis on sustainability and environmentally-friendly farming
            solutions.
          </li>
        </ul>

        <h2>Connecting Communities</h2>
        <p>
          KrishiSeva is more than just a website — it's a movement to strengthen
          the bond between farmers, traders, and consumers. By promoting
          transparency, education, and direct engagement, we aim to create a
          thriving agricultural ecosystem where everyone benefits.
        </p>

        <p>
          Join us on this journey to revolutionize Indian agriculture and create
          a better future for our farmers and our nation.
        </p>
      </div>

      <div className="about-us-image">
        <img
          src={VegetablesImage}
          alt="Fresh vegetables basket at KrishiSeva"
        />
      </div>
    </div>
  );
};

export default AboutUs;
