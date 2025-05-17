import React from "react";
import Landing2 from "../components/Landing2";
import Build from "../components/Build";
import Offers from "../components/Offers";
import Testimony from "../components/Testimony";

const Services = () => {
  return (
    <div>
      <Landing2 name="Services" link="Services" />
      <div className="mb-10">
        <Build />
      </div>
      <Offers />
      <Testimony />
    </div>
  );
};

export default Services;
