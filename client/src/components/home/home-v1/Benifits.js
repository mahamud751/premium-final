"use client";
import { AiOutlineSecurityScan } from "react-icons/ai";

const Benifits = () => {
  return (
    <div className="row g-5">
      <div className="col-lg-6  ">
        <div className="d-flex gap-4">
          <div
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.07)",
              borderRadius: "35px",
              display: "flex",
              width: "70px",
              height: "70px",
              padding: "17px 20px 23px 20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineSecurityScan
              style={{
                width: "30px",
                height: "30px",
                color: "#00C194",
              }}
            />
          </div>
          <div>
            <h6
              className="fw-bold"
              style={{
                fontSize: "15px",
              }}
            >
              Buy property from BDT 10,000
            </h6>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              With fractionalised properties, there is no mortgage or large down
              payments required
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6  ">
        <div className="d-flex gap-3">
          <div
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.07)",
              borderRadius: "35px",
              display: "flex",
              width: "70px",
              height: "70px",
              padding: "17px 20px 23px 20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineSecurityScan
              style={{
                width: "30px",
                height: "30px",
                color: "#00C194",
              }}
            />
          </div>
          <div>
            <h6
              className="fw-bold"
              style={{
                fontSize: "15px",
              }}
            >
              Build a diversified property portfolio{" "}
            </h6>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              Buy tokens of prime rental properties and manage your diversified
              portfolio from the comfort of your home
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6  ">
        <div className="d-flex gap-3">
          <div
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.07)",
              borderRadius: "35px",
              display: "flex",
              width: "70px",
              height: "70px",
              padding: "17px 20px 23px 20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineSecurityScan
              style={{
                width: "30px",
                height: "30px",
                color: "#00C194",
              }}
            />
          </div>
          <div>
            <h6
              className="fw-bold"
              style={{
                fontSize: "15px",
              }}
            >
              Low-effort, high-return property ownership
            </h6>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              We handle the entire sales process, screen tenants, and manage the
              property, saving you time and money!
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6  ">
        <div className="d-flex gap-3">
          <div
            style={{
              backgroundColor: "rgba(235, 103, 83, 0.07)",
              borderRadius: "35px",
              display: "flex",
              width: "70px",
              height: "70px",
              padding: "17px 20px 23px 20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineSecurityScan
              style={{
                width: "30px",
                height: "30px",
                color: "#00C194",
              }}
            />
          </div>
          <div>
            <h6
              className="fw-bold"
              style={{
                fontSize: "15px",
              }}
            >
              Access the highest yielding markets
            </h6>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              You can access markets that have the highest returns, even if
              those markets are far from where you live
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benifits;
