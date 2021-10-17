import TextField from "../inputs/TextField";
import { React, useMemo, useState } from "react";
import Button from "../../components/buttons/Button";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../lib/api/base";
import logOut from "../../helpers/logOut";
import constants from "../../config/constant";

export default function LoginModal({
  title,
  show = false,
  setModalController,
}) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const [loginFailed, setLoginFailed] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [approvalFailed, setApprovalFailed] = useState(false);
  const [activationFailed, setActivationFailed] = useState(false);

  const history = useHistory();

  const onChange = (e, field_name = null) => {
    setValue({
      ...value,
      [field_name ? field_name : e.target.name]: e.target.value,
    });
  };

  const validated = useMemo(
    () =>
      validStatus &&
      !Object.keys(validStatus).some((item) => validStatus[item] === false),
    [validStatus]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaveTrigger(saveTrigger + 1);
    setSaveButtonDisabled(true);

    if (validated) {
      api
        .post("/api/login", {
          email: value?.email,
          password: value?.password,
        })
        .then(([success, response]) => {
          if (success) {
            if (response.status == 200) {
              if (response?.profile_status == 2) {
                logOut();
                setLoginFailed(false);
                setApprovalFailed(true);
              } else if (response?.active_status == 2) {
                logOut();
                setLoginFailed(false);
                setApprovalFailed(false);
                setActivationFailed(true);
              } else {
                localStorage.setItem(
                  "AUTH_TOKEN",
                  response?.success?.token || ""
                );
                setApprovalFailed(false);
                setActivationFailed(false);
                localStorage.setItem("ROLE_ID", response?.role_id);
                localStorage.setItem("USER_ID", response?.user_id);
                localStorage.setItem(
                  "PERMISSIONS",
                  response?.permissions || []
                );
                localStorage.setItem(
                  "PROFILE_STATUS",
                  response?.profile_status || 1
                );
                setLoginFailed(false);

                if (
                  response?.role_id == constants.ROLES.ADMIN ||
                  response?.role_id == constants.ROLES.VENDOR
                ) {
                  history.push("/user/dashboard", {
                    user_details: {
                      user_token: response.success.token,
                      user_role: response.role_id + "",
                      user_id: response.user_id + "",
                      permissions: response?.permissions || [],
                      profile_status: response?.profile_status || 1,
                    },
                  });
                } else {
                  history.push("/user/profile", {
                    user_details: {
                      user_token: response.success.token,
                      user_role: response.role_id + "",
                      user_id: response.user_id + "",
                      permissions: response?.permissions || [],
                      profile_status: response?.profile_status || 1,
                    },
                  });
                }
              }
            } else {
              setLoginFailed(true);
              setApprovalFailed(false);
              setActivationFailed(false);
            }
          }
          setSaveButtonDisabled(false);
        })
        .catch((err) => {
          setSaveButtonDisabled(false);
          setLoginFailed(true);
          console.log(err);
        });
    } else {
      setSaveButtonDisabled(false);
    }
  };

  return (
    show && (
      <div
        className={`modal fade ${show ? ` show` : ``}`}
        id="confirmDeactivateModal"
        tabindex="-1"
        role="dialog"
        {...(show
          ? {
              style: {
                display: "block",
                "padding-right": "17px",
              },
            }
          : {
              display: "none",
            })}
        {...(show ? { "aria-modal": "true" } : { "aria-hidden": "true" })}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="close"
                onClick={(e) =>
                  setModalController({
                    show: false,
                    title: "",
                    confirmation: "",
                    type: "",
                  })
                }
              >
                <span aria-hidden="true">
                  <i className="far fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="login-contgainer">
                <form>
                  {loginFailed ? (
                    <div className="alert alert-danger">
                      Invalid Login Credentials
                    </div>
                  ) : null}
                  {approvalFailed ? (
                    <div className="alert alert-danger">
                      Your account is not yet approved by the admin
                    </div>
                  ) : null}
                  {activationFailed ? (
                    <div className="alert alert-danger">
                      Your account is not activated!
                    </div>
                  ) : null}
                  <div className="form-group">
                    <TextField
                      label="Username/Email"
                      className="form-control"
                      name="email"
                      type="email"
                      value={value?.email}
                      onChange={onChange}
                      saveTrigger={saveTrigger}
                      validStatus={validStatus}
                      setValidStatus={setValidStatus}
                      setValue={setValue}
                      customErrorMessage2="Please enter valid email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      label="Password"
                      className="form-control"
                      name="password"
                      type="password"
                      value={value?.password}
                      onChange={onChange}
                      saveTrigger={saveTrigger}
                      validStatus={validStatus}
                      setValidStatus={setValidStatus}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Link className="float-right mb-3" to="/forgot-password">
                        Forgot Password ?
                      </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <Button
                        className="btn btn-block btn-primary"
                        disabled={saveButtonDisabled}
                        name="submit"
                        type="submit"
                        value="Login"
                        onClick={handleSubmit}
                      />
                    </div>
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-block btn-secondary"
                        name="cancel"
                        type="submit"
                        value="Cancel"
                        onClick={(e) =>
                          setModalController({
                            show: false,
                            title: "",
                            confirmation: "",
                            type: "login",
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    )
  );
}
