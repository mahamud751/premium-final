"use client";
import FaqForm from "@/components/pageComponents/FaqForm";
import AddForm from "@/components/templates/AddForm";

const AddFaq: React.FC = () => {
  const additionalFields = <FaqForm faq={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/faqs`}
      additionalFields={additionalFields}
      buttonText="Add faq"
      //@ts-ignore
      photosData={[]}
      id=""
      link="faq-list"
      isNoPhotoFile={true}
    />
  );
};

export default AddFaq;
