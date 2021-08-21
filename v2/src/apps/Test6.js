import { React, useMemo, useState } from "react";
import TextField from "../components/inputs/TextField";
import { api } from "../lib/api/base";
import Button from "../components/buttons/Button";
import BackendValidation from "../components/validation/backend/BackendValidation";
import { useEffect } from "react";
import lodash from "lodash";
import FrontendValidation from "../components/validation/frontend/FrontendValidation";

export default function Test6(props) {
  const [value, setValue] = useState({
    user_name: "febin",
    last_name: "",
  });
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const [backendValidations, setBackendValidations] = useState([]);
  const [secondaryValidations, setSecondaryValidations] = useState([]);

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

  useEffect(() => {
    // secondary validations example
    var valid = true;
    let obj = {};
    if (validated && value?.user_name === "febin") {
      valid = false;
      obj = {
        ...obj,
        user_name: {
          status: false,
          message: "Name cannot be same as Febin",
        },
      };
    }

    if (validated) {
      if (value?.last_name === value?.user_name) {
        valid = false;
        obj = {
          ...obj,
          last_name: {
            status: false,
            message: "Name cannot be same as user name",
          },
        };
      } else if (value?.last_name === "test") {
        obj = {
          ...obj,
          last_name: {
            status: false,
            message: "Name cannot be same as test",
          },
        };
      }
    }
    if (!valid) {
      setSecondaryValidations(obj);
    } else {
      setSecondaryValidations({});
    }
  }, [validated, value, saveTrigger]);

  const secondaryValidated = useMemo(
    () =>
      secondaryValidations &&
      !Object.keys(secondaryValidations).some(
        (item) => secondaryValidations[item]?.status === false
      ),
    [secondaryValidations]
  );

  const handleSubmit = () => {
    // required
    setSaveTrigger(saveTrigger + 1);

    if (validated && secondaryValidated) {
      api
        .get("/api/validation")
        .then(([success, response]) => {
          if (success) {
            if (!response.status) {
              setBackendValidations(response.response);
            } else {
              setBackendValidations([]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(value);
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      Name:
      <TextField
        name="user_name"
        type="text"
        value={value?.user_name}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        setValue={setValue}
        required
      />
      <FrontendValidation
        errors={secondaryValidations}
        field_name={"user_name"}
        show={validated}
        values={value}
        saveTrigger={saveTrigger}
      />
      <BackendValidation
        errors={backendValidations}
        field_name={"user_name"}
        show={validated && secondaryValidated}
        values={value}
        saveTrigger={saveTrigger}
      />
      Name:
      <TextField
        name="last_name"
        type="text"
        value={value?.last_name}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        setValue={setValue}
        required
      />
      <FrontendValidation
        errors={secondaryValidations}
        field_name={"last_name"}
        show={validated}
        values={value}
        saveTrigger={saveTrigger}
      />
      {/* Email:
      <TextField
        type="email"
        name="email"
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
        min={2}
      />
      <BackendValidation
        errors={backendValidations}
        field_name={"email"}
        show={validated}
        values={value}
        saveTrigger={saveTrigger}
      /> */}
      <Button
        name="submit"
        type="submit"
        value="Check"
        onClick={handleSubmit}
      />
    </>
  );
}
