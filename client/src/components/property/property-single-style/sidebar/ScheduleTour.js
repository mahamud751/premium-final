"use client";
import React, { useState, useEffect } from "react";

const ScheduleTour = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    product_id: product?.id || "", // Optional product_id
    email: "",
    phone: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update product_id if product.id changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product_id: product?.id || "",
    }));
  }, [product?.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Build request body, conditionally including product_id
    const requestBody = {
      name: formData.name,
      mobile: formData.phone,
      email: formData.email,
      details: formData.details,
    };
    if (formData.product_id) {
      requestBody.product_id = formData.product_id;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/product-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the request");
      }

      const result = await response.json();
      setSuccess("Tour request submitted successfully!");
      setFormData({
        name: "",
        product_id: product?.id || "",
        email: "",
        phone: "",
        details: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ps-navtab">
      <div className="tab-content" id="pills-tabContent">
        <div role="tabpanel">
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb20">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb20">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb20">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb10">
                  <textarea
                    cols={30}
                    rows={4}
                    placeholder="Enter Your Messages"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="p-2"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="d-grid">
                  <button
                    type="submit"
                    className="ud-btn btn-thm"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#10572A",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0e4a22")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#10572A")
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                    <i className="fal fa-arrow-right-long ml-2" />
                  </button>
                </div>
              </div>

              {success && (
                <div className="col-md-12 mt20">
                  <p className="text-success">{success}</p>
                </div>
              )}
              {error && (
                <div className="col-md-12 mt20">
                  <p className="text-danger">{error}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTour;
