import "./ProgressSteps.scss";
import { useLocation } from "react-router-dom";
export default function ProgressBar(props) {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <br />
      <br />
      <ul className="list-unstyled multi-steps">
        {location.pathname.startsWith("/agent") ? (
          <>
            <li {...(props?.step === 1 ? { className: "is-active" } : null)}>
              Mobile
            </li>
            <li {...(props?.step === 2 ? { className: "is-active" } : null)}>
              OTP Verification
            </li>
            <li {...(props?.step === 3 ? { className: "is-active" } : null)}>
              Fill Details
            </li>
            <li {...(props?.step === 4 ? { className: "is-active" } : null)}>
              Fill Truck Details
            </li>
          </>
        ) : location.pathname.startsWith("/user") ? (
          <>
            <li {...(props?.step === 1 ? { className: "is-active" } : null)}>
              Mobile
            </li>
            <li {...(props?.step === 2 ? { className: "is-active" } : null)}>
              OTP Verification
            </li>
            <li {...(props?.step === 3 ? { className: "is-active" } : null)}>
              Fill Details
            </li>
          </>
        ) : location.pathname.startsWith("/crediteduser") ? (
          <>
            <li {...(props?.step === 1 ? { className: "is-active" } : null)}>
              Mobile
            </li>
            <li {...(props?.step === 2 ? { className: "is-active" } : null)}>
              OTP Verification
            </li>
            <li {...(props?.step === 3 ? { className: "is-active" } : null)}>
              Fill Details
            </li>
          </>
        ) : location.pathname.startsWith("/vendor") ? (
          <>
            <li {...(props?.step === 1 ? { className: "is-active" } : null)}>
              Mobile
            </li>
            <li {...(props?.step === 2 ? { className: "is-active" } : null)}>
              OTP Verification
            </li>
            <li {...(props?.step === 3 ? { className: "is-active" } : null)}>
              Fill Details
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}
