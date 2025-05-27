"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Project, Vendor, Requisition } from "@/services/types";
import PurchaseForm from "@/components/pageComponents/PurchaseForm";

interface PurchaseItem {
  unit_id: string;
  description: string;
  qty: number;
  unit_price: number;
}

interface PurchaseData {
  project_id: string;
  vendor_id: string;
  requisition_id: string;
  contact_number: string;
  description: string;
  required_date: string;
  items: PurchaseItem[];
}

const AddPurchase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [selectedRequisition, setSelectedRequisition] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({
    project_id: "",
    vendor_id: "",
    requisition_id: "",
    contact_number: "",
    description: "",
    required_date: "",
    items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
  });

  const additionalFields = (
    <PurchaseForm
      purchase={null}
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
    setProjects([]);
    setVendors([]);
    setRequisitions([]);
    setSelectedProject("");
    setSelectedVendor("");
    setSelectedRequisition("");
    setPurchaseData({
      project_id: "",
      vendor_id: "",
      requisition_id: "",
      contact_number: "",
      description: "",
      required_date: "",
      items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
    });
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/purchases`}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          items: purchaseData.items,
        }}
        buttonText="Add Purchase"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="purchase-list"
        numberFields={["qty", "unit_price"]}
      />
    </div>
  );
};

export default AddPurchase;
