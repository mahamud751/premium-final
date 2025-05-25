"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Requisition } from "@/services/types";
import RequisitionForm from "@/components/pageComponents/RequisitionForm";

const AddRequisition: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");

  const [requisitionData, setRequisitionData] = useState<Requisition>({
    project_id: "",
    description: "",
    required_date: "",
    remark: "",
    items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
  });

  const additionalFields = (
    <RequisitionForm
      requisition={null}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      onRequisitionChange={(newRequisition: Requisition) =>
        setRequisitionData(newRequisition)
      }
    />
  );

  const resetFields = () => {
    setRequisitionData((prevRequisition) => ({
      ...prevRequisition,
      project_id: "",
      description: "",
      required_date: "",
      remark: "",
      items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
    }));
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/requisitions`}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          items: requisitionData.items,
        }}
        //@ts-ignore
        photosData={[]}
        buttonText="Add Requisition"
        resetFields={resetFields}
        id=""
        isNoPhotoFile={true}
        link="/requisition-list"
        numberFields={["qty", "unit_price"]}
      />
    </div>
  );
};

export default AddRequisition;
