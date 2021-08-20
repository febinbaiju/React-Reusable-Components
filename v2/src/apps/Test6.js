import { React, useMemo, useState } from "react";
import TextField from "../components/inputs/TextField";
import { api } from "../lib/api/base";
import Button from "../components/buttons/Button";
import BackendValidation from "../components/validation/backend/BackendValidation";

export default function Test6(props) {
  const [value, setValue] = useState({
    user_name: "febin",
    email: "",
  });
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const [backendValidations, setBackendValidations] = useState([]);

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

  const handleSubmit = () => {
    // required
    setSaveTrigger(saveTrigger + 1);

    if (validated) {
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
      <BackendValidation
        errors={backendValidations}
        field_name={"user_name"}
        show={validated}
        values={value}
        saveTrigger={saveTrigger}
      />
      Email:
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
      />
      <Button
        name="submit"
        type="submit"
        value="Check"
        onClick={handleSubmit}
      />
    </>
  );
}
