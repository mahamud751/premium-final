"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";

import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PaymentForm from "@/components/pageComponents/PaymentForm";

const AddPayment: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductTye, setSelectedProductType] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [selectedPayementType, setSelectedPaymentType] = useState<string>("");
  const photosData: { title: string; src: string }[] = [];
  const [files, setFiles] = useState<File[]>([]);
  const additionalFields = (
    <>
      <PaymentForm
        payment={null}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="entity_type">Entity Type</InputLabel>
          <Select
            labelId="entity_type"
            id="entity_type"
            label="Select Entity Type"
            name="entity_type"
            value={selectedProductTye}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <MenuItem value="Product">Product</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="payment-method">Payment Method</InputLabel>
          <Select
            labelId="payment-method"
            id="payment-method"
            label="Select Payment Method"
            name="payment_method"
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            <MenuItem value="cash">Cash</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="payment-type">Payment Type</InputLabel>
          <Select
            labelId="payment-type"
            id="payment-type"
            label="Select Payment Type"
            name="payment_type"
            value={selectedPayementType}
            onChange={(e) => setSelectedPaymentType(e.target.value)}
          >
            <MenuItem value="booking_money">Booking Money</MenuItem>
            <MenuItem value="land_registration">Land Registration</MenuItem>
            <MenuItem value="service_charge">Service Charge</MenuItem>
            <MenuItem value="emi">Emi</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  const resetFields = () => {
    setSelectedProduct("");
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/payments`}
        additionalFields={additionalFields}
        additionalData={{
          documents: [],
          deleted_documents: [],
        }}
        files={files}
        setFiles={setFiles}
        buttonText="Add Payment"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={photosData}
        link="payment-list"
      />
    </div>
  );
};

export default AddPayment;
