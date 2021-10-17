import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import getDetails from "../../helpers/getDetails";
import Header from "../header/Header";

export default function Unapproved(props) {
  const location = useLocation();

  const user_details = useMemo(() => {
    return getDetails(location?.state?.user_details);
  }, [location?.state]);

  return (
    <>
      <body id="page-top" className="bg-white">
        <Header {...props} user_details={user_details} />
        <div className="page-wrapper ">
          <div className="container">
            <div className="d-md-flex">
                Your Account is not approved by the Admin
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
