"use client";
import React, { useEffect, useState } from "react";
import {
  BaseEditProps,
  Requisition,
  RequisitionApiResponse,
} from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import RequisitionForm from "@/components/pageComponents/RequisitionForm";

const EditRequisition: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<RequisitionApiResponse>(
    `admin/requisitions/${params.id}`
  );
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [, setDescription] = useState<string>("");
  const [, setRequiredDate] = useState<string>("");
  const [, setRemark] = useState<string>("");
  const [requistionData, setRequisitionData] = useState<Requisition>({
    project_id: "",
    description: "",
    required_date: "",
    remark: "",
    items: [
      {
        unit_id: "",
        description: "",
        qty: 0,
        unit_price: 0,
      },
    ],
  });

  useEffect(() => {
    if (data?.data) {
      setRequisitionData(data.data);
      setSelectedProject(data.data.project_id || "");
      setDescription(data.data.description || "");
      setRequiredDate(data.data.required_date || "");
      setRemark(data.data.remark || "");
    }
  }, [data]);

  const additionalFields = (
    <RequisitionForm
      requisition={data?.data || null}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      onRequisitionChange={(newRequisition: Requisition) =>
        setRequisitionData(newRequisition)
      }
    />
  );

  const resetFields = () => {
    setSelectedProject("");
    setDescription("");
    setRequiredDate("");
    setRemark("");
  };

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/requisitions/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          items: requistionData.items,
        }}
        buttonText="Edit Requisition"
        resetFields={resetFields}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/requisition-list"
        numberFields={["qty", "unit_price"]}
      />
    </LoadingError>
  );
};

export default EditRequisition;
