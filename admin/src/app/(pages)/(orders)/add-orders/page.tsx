"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Project, Product, AdditionalData } from "@/services/types";
import OrderForm from "@/components/pageComponents/OrderForm";

interface OrderData {
  user_id: string;
  project_id: string;
  product_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  payment_date: string;
  payment_note: string;
  documents: string[];
}

const AddOrder: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [, setProjects] = useState<Project[]>([]);
  const [, setProducts] = useState<Product[]>([]);
  const [orderData, setOrderData] = useState<OrderData>({
    user_id: "",
    project_id: "",
    product_id: "",
    amount: 0,
    payment_method: "",
    transaction_id: "",
    payment_date: "",
    payment_note: "",
    documents: [],
  });

  const additionalFields = (
    <OrderForm
      order={null}
      selectedProject={selectedProject}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      setSelectedProject={setSelectedProject}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
      onOrderChange={(newOrder) => setOrderData(newOrder)}
    />
  );

  const resetFields = () => {
    setProjects([]);
    setProducts([]);
    setSelectedProject("");
    setSelectedProduct("");
    setOrderData({
      user_id: "",
      project_id: "",
      product_id: "",
      amount: 0,
      payment_method: "",
      transaction_id: "",
      payment_date: "",
      payment_note: "",
      documents: [],
    });
  };
  const additionalData: AdditionalData = {
    documents: [],
    deleted_documents: [],
  };
  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/orders`}
        additionalFields={additionalFields}
        additionalData={additionalData}
        buttonText="Add Order"
        resetFields={resetFields}
        files={files}
        setFiles={setFiles}
        id={""}
        link="orders-list"
      />
    </div>
  );
};

export default AddOrder;
