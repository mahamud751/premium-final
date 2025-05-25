"use client";
import React, { useEffect, useState } from "react";
import { BaseEditProps } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import PurchaseForm from "@/components/pageComponents/PurchaseForm";

interface PurchaseItem {
  unit_id: string;
  description: string;
  qty: number;
  unit_price: number;
}

interface PurchaseData {
  project_id: string;
  requisition_id: string;
  vendor_id: string;
  contact_number: string;
  description: string;
  required_date: string;
  items: PurchaseItem[];
}

interface PurchaseApiResponse {
  data: PurchaseData;
}

const EditPurchase: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<PurchaseApiResponse>(
    `admin/purchases/${params.id}`
  );
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [selectedRequisition, setSelectedRequisition] = useState<string>("");
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({
    project_id: "",
    vendor_id: "",
    contact_number: "",
    description: "",
    required_date: "",
    requisition_id: "",
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
      setPurchaseData(data.data);
      setSelectedProject(data.data.project_id || "");
      setSelectedVendor(data.data.vendor_id || "");
    }
  }, [data]);

  const additionalFields = (
    <PurchaseForm
      purchase={data?.data || null}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      selectedVendor={selectedVendor}
      setSelectedVendor={setSelectedVendor}
      selectedRequisition={selectedRequisition}
      setSelectedRequisition={setSelectedRequisition}
      onPurchaseChange={(newPurchase) => setPurchaseData(newPurchase)}
    />
  );

  const resetFields = () => {
    setSelectedProject("");
    setSelectedVendor("");
    setSelectedRequisition("");
    setPurchaseData({
      project_id: "",
      requisition_id: "",
      vendor_id: "",
      contact_number: "",
      description: "",
      required_date: "",
      items: [
        {
          unit_id: "",
          description: "",
          qty: 0,
          unit_price: 0,
        },
      ],
    });
  };

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/purchases/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          items: purchaseData.items,
          project_id: purchaseData.project_id,
          vendor_id: purchaseData.vendor_id,
          contact_number: purchaseData.contact_number,
          description: purchaseData.description,
          required_date: purchaseData.required_date,
        }}
        buttonText="Edit Purchase"
        resetFields={resetFields}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/purchase-list"
        numberFields={["qty", "unit_price"]}
      />
    </LoadingError>
  );
};

export default EditPurchase;
