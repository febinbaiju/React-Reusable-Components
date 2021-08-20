import { React, useEffect, useState } from "react";
import TextField from "./TextField";

export default function PasswordConfirmation(props) {
  const [value, setValue] = useState();
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [runValidations, setRunValidations] = useState(false);
  const [showPrimaryValidation, setShowPrimaryValidation] = useState();

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    props?.onChange(e);
  };

  const middleValidation = (e) => {
    if (e.password_confirmation) {
      setShowPrimaryValidation(true);
    } else {
      setShowPrimaryValidation(false);
    }
    props?.setValidStatus(e);
  };

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);

      setRunValidations(true);
    }
  }, [props?.saveTrigger]);

  useEffect(() => {
    if (runValidations) {
      if (value?.password !== value?.password_confirmation) {
        props?.setValidStatus({
          confirmation_password: false,
        });
      } else {
        props?.setValidStatus({
          confirmation_password: true,
        });
      }
    }
  }, [value, runValidations]);
  return (
    <div {...(props?.className ? { className: props?.className } : null)}>
      Password:
      <TextField
        name="password"
        type="password"
        value={value?.password}
        onChange={onChange}
        saveTrigger={props?.saveTrigger} // required
        validStatus={props?.validStatus} // required
        setValidStatus={middleValidation} // required
        required
      />
      Confirm Password:
      <TextField
        name="password_confirmation"
        type="password"
        value={value?.password_confirmation}
        onChange={onChange}
        saveTrigger={props?.saveTrigger} // required
        validStatus={props?.validStatus} // required
        setValidStatus={middleValidation} // required
        required
      />
      {props?.validStatus?.confirmation_password === false &&
        showPrimaryValidation && (
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
