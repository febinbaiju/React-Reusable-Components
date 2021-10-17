import { Link, useLocation } from "react-router-dom";
import loader from "../../../assets/img/loader.svg";
import { useMemo } from "react";
import getDetails from "../../../helpers/getDetails";

export default function GuestHeader(props) {
  const location = useLocation();

  const user_details = useMemo(() => {
    return getDetails(location?.state?.user_details);
  }, [location?.state]);

  return (
    <header className="header inner-header">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="logo-img">
              <img alt="" src={props?.logo} height="111px" />
            </div>
          </div>
          <div className="col-md-6 pt-2">
            <Link
              to={{
                pathname: "/",
                user_details: {
                  ...user_details,
                },
              }}
              className="btn btn-secondary"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
      {props?.loading && <div className="loader-back"></div>}
      {props?.loading && (
        <div className="loader-container">
          <img className="center" alt="logo" src={loader} height="" />
        </div>
      )}
    </header>
  );
}
