import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginSignupModal = ({ closeModal }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">
          Welcome to The Premium Homes Ltd.
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
        />
      </div>

      <div className="modal-body">
        <div className="log-reg-form">
          <div className="navtab-style2">
            <nav>
              <div className="nav nav-tabs mb20" id="nav-tab" role="tablist">
                <button
                  className="nav-link active fw600"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign In
                </button>
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent2">
              <div
                className="tab-pane fade show active fz15"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <SignIn closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
