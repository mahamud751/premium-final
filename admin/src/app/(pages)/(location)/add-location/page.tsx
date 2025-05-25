"use client";

import AddForm from "@/components/templates/AddForm";
import LocationForm from "@/components/pageComponents/LocationForm";

const AddLocation: React.FC = () => {
  const additionalFields = <LocationForm location={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/locations`}
      additionalFields={additionalFields}
      buttonText="Add Location"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="location-list"
    />
  );
};

export default AddLocation;
