import React from "react";
import "./Body.css";

import Top from "./Top/Top";
import Listing from "./Listing/Listing";
import Activity from "./Activity/Activity";

const Body: React.FC = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className={`bottom d-flex`}>
        <Listing />
        <Activity />
      </div>
    </div>
  );
};

export default Body;
