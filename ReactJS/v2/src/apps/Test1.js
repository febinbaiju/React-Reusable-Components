import { React, useMemo, useState } from "react";
import TextField from "../components/inputs/TextField";
import Button from "../components/buttons/Button";

export default function Login(props) {
  const [value, setValue] = useState({
    first_name: "",
    last_name: ""
  });
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

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
      alert("Valid");
      console.log(value);
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      First Name:
      <TextField
        name="first_name"
        type="text"
        value={value?.first_name} //required
        onChange={onChange} //required
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        setValue={setValue} // required
        required
      />
      Last Name:
      <TextField
        name="last_name"
        value={value?.last_name}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
        min={2}
        max={5}
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
