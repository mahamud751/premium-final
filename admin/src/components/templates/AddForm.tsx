// components/templates/AddForm.tsx
import axios from "axios";
import React, {
  FormEvent,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Box, Grid, Paper } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import MultipleImageUpload from "../molecules/MultipleImage";
import ImagePdfUpload from "../molecules/ImagePdfUpload";
import AddButton from "../atoms/AddButton";
import useExtractLinkPart from "@/services/hooks/useExtractLinkPart";
import { Photo, AdditionalData, ImageFieldConfig } from "@/services/types";
import { useAuth } from "@/services/hooks/auth";

interface AddFormProps<T extends { [key: string]: Photo[] }> {
  endpoint: string;
  id?: string;
  link: string;
  additionalFields?: React.ReactNode;
  additionalData?: AdditionalData;
  buttonText: string;
  resetFields?: () => void;
  imageFields?: ImageFieldConfig[];
  photosData?: T;
  setPhotosData?: React.Dispatch<React.SetStateAction<T>>;
  files?: File[];
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  numberFields?: string[];
  booleanFields?: string[];
  isFile?: boolean;
  isNoPhotoFile?: boolean;
  imageLabel?: string;
  children?: ReactNode;
}

const AddForm = <T extends { [key: string]: Photo[] }>({
  endpoint,
  id = "",
  link,
  additionalFields,
  buttonText,
  resetFields,
  additionalData,
  imageFields = [],
  photosData = {} as T,
  setPhotosData,
  files = [],
  setFiles,
  numberFields = [],
  booleanFields = [],
  isFile = false,
  isNoPhotoFile = false,
  imageLabel,
  children,
}: AddFormProps<T>) => {
  const { token } = useAuth();
  const [imageFieldPreviews, setImageFieldPreviews] = useState<{
    [key: string]: string[];
  }>({});
  const [imageFieldPhotos, setImageFieldPhotos] = useState<{
    [key: string]: File[];
  }>({});
  const [initialPhotosData, setInitialPhotosData] = useState<{
    [key: string]: Photo[];
  }>({});

  const MySwal = withReactContent(Swal);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const firstPart = useExtractLinkPart(link);
  console.log("photosData", photosData);
  console.log("initialPhotosData", initialPhotosData);

  useEffect(() => {
    const previews: { [key: string]: string[] } = {};
    Object.entries(photosData).forEach(([key, photos]) => {
      previews[key] = Array.isArray(photos)
        ? photos.map((photo) => photo?.src || "")
        : [];
    });
    setImageFieldPreviews(previews);
    console.log("Updated imageFieldPreviews:", previews);

    // Only set initialPhotosData if it is empty
    if (Object.keys(initialPhotosData).length === 0) {
      setInitialPhotosData(photosData);
    }
  }, [photosData]); // Remove initialPhotosData from dependencies

  const handleImagesChange = React.useCallback(
    (key: string, isMultiple: boolean) => (files: File[]) => {
      const newPhotos = files.filter((file) => file.type.startsWith("image/"));
      if (newPhotos.length === 0) return;

      const newPhotoUrls = newPhotos.map((file) => URL.createObjectURL(file));
      setImageFieldPhotos((prev) => ({
        ...prev,
        [key]: isMultiple ? [...(prev[key] || []), ...newPhotos] : newPhotos,
      }));
      setImageFieldPreviews((prev) => ({
        ...prev,
        [key]: isMultiple
          ? [...(prev[key] || []), ...newPhotoUrls]
          : newPhotoUrls,
      }));

      if (setPhotosData) {
        const newPhotosData = newPhotos.map((file) => ({
          title: file.name,
          src: URL.createObjectURL(file),
        }));
        setPhotosData((prev) => ({
          ...prev,
          [key]: isMultiple
            ? [...(prev[key] || []), ...newPhotosData]
            : newPhotosData,
        }));
      }
    },
    [setPhotosData]
  );

  const handleRemoveImage = React.useCallback(
    (key: string) => (index: number) => {
      setImageFieldPreviews((prev) => ({
        ...prev,
        [key]: prev[key]?.filter((_, i) => i !== index) || [],
      }));
      setImageFieldPhotos((prev) => ({
        ...prev,
        [key]: prev[key]?.filter((_, i) => i !== index) || [],
      }));
      if (setPhotosData) {
        setPhotosData((prev) => ({
          ...prev,
          [key]: prev[key]?.filter((_, i) => i !== index) || [],
        }));
      }
    },
    [setPhotosData]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    booleanFields.forEach((field) => {
      const value = formData.get(field);
      formData.delete(field);
      formData.append(field, String(value === "on" ? 1 : 0));
    });

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (
          key === "images" ||
          key === "image" ||
          key === "unit_images" ||
          key === "floor_images" ||
          key === "documents" ||
          key === "deleted_documents"
        ) {
          return;
        }
        if (key === "progress_timeline") {
          (value as any[]).forEach((entry, index) => {
            formData.append(`progress_timeline[${index}][title]`, entry.title);
            formData.append(
              `progress_timeline[${index}][progress]`,
              entry.progress.toString()
            );
            formData.append(
              `progress_timeline[${index}][status]`,
              entry.status.toString()
            );
          });
        } else if (key === "details") {
          (value as any[]).forEach((entry, index) => {
            formData.append(
              `details[${index}][chart_of_account_id]`,
              entry.chart_of_account_id
            );
            formData.append(
              `details[${index}][entry_type]`,
              entry.entry_type.toString()
            );
            formData.append(`details[${index}][amount]`, entry.amount);
          });
        } else if (key === "items") {
          (value as any[]).forEach((entry, index) => {
            formData.append(`items[${index}][unit_id]`, entry.unit_id);
            formData.append(`items[${index}][description]`, entry.description);
            formData.append(`items[${index}][qty]`, entry.qty);
            formData.append(
              `items[${index}][unit_price]`,
              entry.unit_price.toString()
            );
          });
        } else if (key === "cc_camera_urls") {
          (value as string[]).forEach((url, index) => {
            formData.append(`cc_camera_urls[${index}]`, url);
          });
        } else if (key === "documents" || key === "deleted_documents") {
          // Handled separately
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
    }

    if (!isNoPhotoFile) {
      // Handle images (new uploads and deletions)
      imageFields.forEach(({ key, isArray }) => {
        const initialUrls = (initialPhotosData[key] || [])
          .map((photo) => photo.src)
          .filter(
            (url) => url && typeof url === "string" && !url.startsWith("blob:")
          );
        const currentUrls = (photosData[key] || [])
          .map((photo) => photo.src)
          .filter(
            (url) => url && typeof url === "string" && !url.startsWith("blob:")
          );
        const deletedUrls = initialUrls.filter(
          (url) => !currentUrls.includes(url)
        );

        if (deletedUrls.length > 0) {
          deletedUrls.forEach((url, index) => {
            formData.append(`${key}_delete[${index}]`, url);
          });
        }

        const newPhotos = imageFieldPhotos[key] || [];
        if (isArray) {
          newPhotos.forEach((photo, index) => {
            if (photo instanceof File) {
              formData.append(`${key}[${index}]`, photo);
            }
          });
        } else {
          const photo = newPhotos[0];
          if (photo instanceof File) {
            formData.append(key, photo);
          }
        }
      });

      // Handle documents (new uploads and deletions)
      if (additionalData?.deleted_documents?.length ?? 0 > 0) {
        additionalData?.deleted_documents?.forEach(
          (url: string, index: number) => {
            formData.append(`documents_delete[${index}]`, url);
          }
        );
      }
      if (files.length > 0) {
        files.forEach((file, index) => {
          if (file.type === "application/pdf") {
            formData.append(`documents[${index}]`, file);
          }
        });
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = id
        ? await axios.post(endpoint, formData, config) // Use PUT for edit
        : await axios.post(endpoint, formData, config);

      MySwal.fire(
        "Success",
        response.data.message || "Operation successful",
        "success"
      ).then(() => {
        router.push(link);
      });

      formRef.current?.reset();
      setImageFieldPreviews({});
      setImageFieldPhotos({});
      if (resetFields) resetFields();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorResponse = err.response.data;
        if (
          errorResponse &&
          errorResponse.errors &&
          typeof errorResponse.errors === "object"
        ) {
          Object.entries(errorResponse.errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            MySwal.fire(
              `${field.charAt(0).toUpperCase() + field.slice(1)} Error`,
              errorMessage as string,
              "error"
            );
          });
        } else {
          MySwal.fire(
            "Something went wrong.",
            errorResponse.message || "Unknown error",
            "error"
          );
        }
      } else if (err instanceof Error) {
        MySwal.fire("Something went wrong.", err.message, "error");
      } else {
        MySwal.fire(
          "Something went wrong.",
          "An unknown error occurred.",
          "error"
        );
      }
    }
  };
  console.log("ss", photosData);
  return (
    <div className="md:mx-24 md:p-12">
      <Paper elevation={2} className="shadow-lg">
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box
            sx={{
              padding: { xs: 1, sm: 8 },
            }}
          >
            <Grid container spacing={2}>
              {additionalFields}

              <>
                {imageFields.map(({ key, isMultiple, label }) => {
                  console.log("imageFields", imageFields);
                  console.log("imageFieldPreviews", imageFieldPreviews);

                  return (
                    <Grid item xs={8} key={key}>
                      <MultipleImageUpload
                        photosData={imageFieldPreviews[key] || []}
                        onImagesChange={handleImagesChange(key, isMultiple)}
                        onRemoveImage={handleRemoveImage(key)}
                        isMultiple={isMultiple}
                        imageLabel={label}
                      />
                    </Grid>
                  );
                })}
                {children ||
                  (setFiles && (
                    <Grid item xs={8}>
                      <ImagePdfUpload
                        onFilesChangePdf={setFiles}
                        files={files}
                        isMultiple={true}
                        isFile={true}
                        imageLabel="Only PDF files are allowed"
                        accept="application/pdf"
                      />
                    </Grid>
                  ))}
              </>
            </Grid>
            <AddButton buttonText={buttonText} />
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AddForm;
