import React from "react";
import "../styles/Content.css";
import { BackButton } from "./BackButton";
const Content = () => {
  return (
    <div className="content-wrapper">
      <BackButton />
      <div className="hero-section"></div>

      <div className="text-section">
        <p className="section-text">
          With AllInOneClick, we aim to bring you the best products and services
          right to your doorstep. Whether you're in the mood for a pharmacy
          order, grocery shopping, or enjoying a nice meal, we make it easy for
          you to get exactly what you need with just a few clicks.
        </p>
        <p className="section-text">
          You’ll always receive excellent customer service from our friendly
          team. We are here to make your life easier, providing you with the
          ultimate convenience. So sit back, relax, and let AllInOneClick take
          care of the rest.
        </p>

        <h3 className="section-title">Our Mission</h3>
        <p className="section-text">
          Our mission is to drive economic development across cities by
          accelerating e-commerce adoption. We believe technology and innovation
          will be the main catalyst of progress, driving productivity, creating
          jobs, new businesses, and growing the economy. We are proud to lead
          this change.
        </p>

        <h3 className="section-title">Ecosystem & Business Model</h3>
        <p className="section-text">
          AllInOneClick is more than just a service—it's a movement for economic
          progress. We are working to revolutionize the way people access
          products and services by offering quick and efficient delivery options
          that improve people's daily lives.
        </p>

        <h3 className="section-title">For Consumers</h3>
        <p className="section-text">
          We provide access to a wide variety of products that can be delivered
          in minutes, as well as services that give you more free time and
          enhance your quality of life.
        </p>

        <h3 className="section-title">For Entrepreneurs</h3>
        <p className="section-text">
          We help entrepreneurs grow by providing access to new customers,
          logistics, and business insights. By supporting entrepreneurs, we
          strengthen the community and fuel innovation.
        </p>
      </div>
    </div>
  );
};

export { Content };
