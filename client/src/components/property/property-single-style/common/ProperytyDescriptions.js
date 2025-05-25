import React from "react";

const ProperytyDescriptions = ({ product }) => {
  return (
    <>
      <p className="text mb10">{product?.description}</p>
    </>
  );
};

export default ProperytyDescriptions;
