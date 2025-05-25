"use client";
import React, { useEffect, useState } from "react";
import {
  BaseEditProps,
  Department,
  Designation,
  EmployeeApiResponse,
  User,
} from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import { Grid, SelectChangeEvent } from "@mui/material";
import StatusSelect from "@/components/molecules/StatusSelect";
import EmployeeForm from "@/components/pageComponents/EmployeeForm";

const EditEmployee: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<EmployeeApiResponse>(
    `admin/employees/${params.id}`
  );

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Fetch projects for the ProjectSelect dropdown
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User[] }>("admin/users");

  const { data: departmentData } = useFetch<{ data: Department[] }>(
    "admin/departments"
  );
  const { data: designationData } = useFetch<{ data: Designation[] }>(
    "admin/designations"
  );

  useEffect(() => {
    if (data?.data) {
      setSelectedUser(data?.data?.employee?.user_id || "");
      setSelectedDepartment(data?.data?.employee?.department_id || "");
      setSelectedDesignation(data?.data?.employee?.designation_id || "");
      setStatus(data.data.status);
    }
  }, [data, userData, departmentData, designationData]);

  const resetFields = () => {};
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };
  const additionalFields = (
    <>
      <EmployeeForm
        employee={data?.data || null}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );
  return (
    <LoadingError loading={loading || userLoading} error={error || userError}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/employees/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Employee"
        resetFields={resetFields}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/employee-list"
      />
    </LoadingError>
  );
};

export default EditEmployee;
