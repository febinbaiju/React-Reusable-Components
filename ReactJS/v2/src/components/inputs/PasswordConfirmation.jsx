import { React, useEffect, useState } from "react";
import TextField from "./TextField";

export default function PasswordConfirmation(props) {
  const [value, setValue] = useState({
    password: props?.password,
    password_confirmation: props?.password_confirmation,
  });
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [runValidations, setRunValidations] = useState(true);
  const [showPrimaryValidation, setShowPrimaryValidation] = useState();
  const [triggeredSave, setTriggeredSave] = useState(false)

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    props?.onChange(e);
  };

  const middleValidation = (e) => {
    if (e?.confirm_password) {
      setShowPrimaryValidation(true);
    } else {
      setShowPrimaryValidation(false);
    }
    props?.setValidStatus(e);
  };

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
      setTriggeredSave(true)
      setRunValidations(true);
    }
  }, [props?.saveTrigger]);

  useEffect(() => {
    if (runValidations) {
      if (props?.password === props?.confirm_password) {
        props?.setValidStatus((data) => ({
          ...data,
          confirmation_password: true,
        }));
      } else {
        props?.setValidStatus((data) => ({
          ...data,
          confirmation_password: false,
        }));
      }
    }
  }, [value, runValidations]);

  return (
    <div {...(props?.className ? { className: props?.className } : null)}>
      <TextField
        className="form-control"
        label="Password"
        name="password"
        type="password"
        value={value?.password}
        onChange={onChange}
        saveTrigger={props?.saveTrigger} // required
        validStatus={props?.validStatus} // required
        setValidStatus={middleValidation} // required
        min={8}
        required
      />
      <TextField
        className="form-control"
        label="Confirm Password"
        name="confirm_password"
        type="password"
        value={value?.confirm_password}
        onChange={onChange}
        saveTrigger={props?.saveTrigger} // required
        validStatus={props?.validStatus} // required
        setValidStatus={middleValidation} // required
        min={8}
        required
      />
      {props?.validStatus?.confirmation_password === false &&
        showPrimaryValidation && triggeredSave && (
          <div
            style={{
              color: "red",
            }}
          >
            Password & Confirm password are not same
          </div>
        )}
    </div>
  );
}
