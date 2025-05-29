"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Journal, Requisition } from "@/services/types";
import RequisitionForm from "@/components/pageComponents/RequisitionForm";
import JournalForm from "@/components/pageComponents/JournalForm";

const AddJournal: React.FC = () => {
  const [journalData, setJournalData] = useState<Journal>({
    reference_number: "",
    description: "",
    transaction_date: "",
    details: [{ chart_of_account_id: "", entry_type: "", amount: 0 }],
  });

  const additionalFields = (
    <JournalForm
      journal={null}
      onJournalChange={(newJournal: Journal) => setJournalData(newJournal)}
    />
  );

  const resetFields = () => {
    setJournalData((prevJournal) => ({
      ...prevJournal,
      reference_number: "",
      description: "",
      transaction_date: "",
      details: [{ chart_of_account_id: "", entry_type: "", amount: 0 }],
    }));
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/journal-entries`}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          details: [journalData.details],
        }}
        buttonText="Add Journal"
        resetFields={resetFields}
        id=""
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="journal-list"
        numberFields={["amount"]}
      />
    </div>
  );
};

export default AddJournal;
