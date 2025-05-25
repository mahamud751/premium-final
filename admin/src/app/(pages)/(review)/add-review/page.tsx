"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import ReviewForm from "@/components/pageComponents/ReviewForm";

const AddReview: React.FC = () => {
  const additionalFields = <ReviewForm review={null} />;
  const photosData = {
    image: [],
  };
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/reviews`}
      additionalFields={additionalFields}
      buttonText="Add Review"
      id=""
      photosData={photosData}
      link="review-list"
      imageFields={[
        {
          key: "image",
          isMultiple: false,
          label: "Size must be (610*510)",
          isArray: false,
        },
      ]}
    />
  );
};

export default AddReview;
