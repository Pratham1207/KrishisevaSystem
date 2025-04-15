import React from "react";
import "./Body.css";

import Top from "./Top/Top";
import Listing from "./Listing/Listing";

const Body: React.FC = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className={`bottom d-flex`}>
        <Listing />
      </div>
    </div>
  );
};

export default Body;
