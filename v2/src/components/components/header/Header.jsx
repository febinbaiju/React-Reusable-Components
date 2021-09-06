import { Link, useLocation } from "react-router-dom";
import nopreview from "../../assets/img/avatar.svg";
import loader from "../../assets/img/loader.svg";

export default function Header(props) {
  let user_details = props?.user_details;

  const location = useLocation();
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar  static-top  w-100">
      {props?.loading && <div className="loader-back"></div>}
      {props?.loading && (
        <div className="loader-container">
          <img className="center" alt="logo" src={loader} height="" />
        </div>
      )}

      <button
        className="navbar-toggler d-block border-0 left-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div className="wrapper-menu">
          <div className="line-menu  "></div>
          <div className="line-menu half"></div>
          <div className="line-menu "></div>
        </div>
      </button>
      <button className="navbar-toggler mob-navtoggler border-0 d-md-none">
        <div className="wrapper-menu">
          <div className="line-menu  "></div>
          <div className="line-menu half"></div>
          <div className="line-menu "></div>
        </div>
      </button>
      <div className="topbar-divider d-none d-sm-block"></div>
      <Link
        className={`nav-link ${
          location.pathname.startsWith("/user/dashboard") ? "active" : ""
        }`}
        to={{
          pathname: "/user/dashboard",
          user_details: {
            ...user_details,
          },
        }}
      >
        <img alt="logo" src={props?.logo} height="55px" />
      </Link>

      <div
        className="collapse navbar-collapse nav-menu"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname.startsWith("/user/dashboard") ? "active" : ""
              }`}
              to={{
                pathname: "/user/dashboard",
                user_details: {
                  ...user_details,
                },
              }}
            >
              Dashboard
            </Link>
          </li>

          {user_details?.admin && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/vendor/") ? "active" : ""
                }`}
                to={{
                  pathname: "/vendor/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Vendors
              </Link>
            </li>
          )}

          {user_details?.vendor && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/trucks/") ? "active" : ""
                }`}
                to={{
                  pathname: "/trucks/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Truck Details
              </Link>
            </li>
          )}

          {user_details?.vendor && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/agents/")
                    ? "active"
                    : ""
                }`}
                to={{
                  pathname: "/agents/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Agent Details
              </Link>
            </li>
          )}

          {user_details?.admin && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/trucks/") ? "active" : ""
                }`}
                to={{
                  pathname: "/trucks/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Trucks
              </Link>
            </li>
          )}
          {user_details?.admin && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/user") &&
                  !location.pathname.startsWith("/user/dashboard") &&
                  !location.pathname.startsWith("/user/profile")
                    ? "active"
                    : ""
                }`}
                to={{
                  pathname: "/user/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Users
              </Link>
            </li>
          )}

          {user_details?.admin && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/iot/") ? "active" : ""
                }`}
                to={{
                  pathname: "/iot/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                IOT Devices
              </Link>
            </li>
          )}

          {user_details?.admin && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/agents/") ? "active" : ""
                }`}
                to={{
                  pathname: "/agents/list",
                  user_details: {
                    ...user_details,
                  },
                }}
              >
                Agents
              </Link>
            </li>
          )}

          {user_details?.agent && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.startsWith("/agent/truck") ? "active" : ""
                }`}
                to="/agent/truck"
              >
                Truck Details
              </Link>
            </li>
          )}

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                alt=""
                className="img-profile rounded-circle"
                src={nopreview}
              />
            </a>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <li className="nav-item">
                <Link className={`dropdown-item`} to="/user/profile">
                  Profile
                </Link>
              </li>
              <div className="dropdown-divider"></div>
              {user_details?.admin && (
                <>
                  <Link
                    className={`dropdown-item`}
                    to={{
                      pathname: "/permission/list",
                      user_details: {
                        ...user_details,
                      },
                    }}
                  >
                    Permissions
                  </Link>
                  <div className="dropdown-divider"></div>
                </>
              )}
              {user_details?.admin && (
                <>
                  <Link
                    className={`dropdown-item`}
                    to={{
                      pathname: "/role/list",
                      user_details: {
                        ...user_details,
                      },
                    }}
                  >
                    Roles
                  </Link>
                  <div className="dropdown-divider"></div>
                </>
              )}
              <Link
                className="dropdown-item"
                to={{
                  pathname: "/logout",
                }}
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i
                  // data-toggle="modal"
                  // data-target="#logoutModal"
                  className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                ></i>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <button className="navbar-toggler mob-navtoggler border-0 d-md-none">
        <a id="hamburger-icon" href="#" title="Menu">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </a>
      </button>
    </nav>
  );
}
