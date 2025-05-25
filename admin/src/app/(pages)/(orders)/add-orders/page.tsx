"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Project, Product } from "@/services/types";
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
}

const AddOrder: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [, setProjects] = useState<Project[]>([]);
  const [, setProducts] = useState<Product[]>([]);
  const [, setOrderData] = useState<OrderData>({
    user_id: "",
    project_id: "",
    product_id: "",
    amount: 0,
    payment_method: "",
    transaction_id: "",
    payment_date: "",
    payment_note: "",
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
    });
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/orders`}
        additionalFields={additionalFields}
        //@ts-ignore
        additionalData={[]}
        buttonText="Add Order"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="orders-list"
      />
    </div>
  );
};

export default AddOrder;
