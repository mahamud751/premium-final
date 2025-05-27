"use client";
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileBox from "./ProfileBox";

const PersonalInfo = ({ onImageChange, uploadedImage }) => {
  const { token } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: [], // Initialize image as array to match readdata structure
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data.data;
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Add regular form data
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);

    // Add image handling only if uploadedImage exists
    if (uploadedImage) {
      // If there's an existing image from API and it's a valid URL
      if (
        user.image?.[0] &&
        typeof user.image[0] === "string" &&
        user.image[0].startsWith("http")
      ) {
        data.append("image_delete[0]", user.image[0]);
      }
      // Add the new uploaded image
      data.append("image", uploadedImage);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        image: response.data.data.image || user.image,
      });
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading User Info...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProfileBox
        onImageChange={onImageChange}
        uploadedImage={uploadedImage}
        apiImage={user.image[0]}
      />
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone"
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your First Name"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Last Name"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Position
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Position"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Language
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Language"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Company Name"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Tax Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Tax Number"
                readOnly
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-xl-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your Address"
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-12">
            <div className="mb10">
              <label className="heading-color ff-heading fw600 mb10">
                About me
              </label>
              <textarea
                cols={30}
                rows={4}
                placeholder="There are many variations of passages."
                readOnly
                defaultValue={user?.description}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-12">
            <div className="text-end">
              <button type="submit" className="ud-btn btn-dark">
                Update Profile
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
          {/* End .col */}
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default PersonalInfo;
