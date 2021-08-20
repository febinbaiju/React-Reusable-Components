import { useState } from "react";
import { React } from "react";
import TimePicker from "../components/inputs/TimePicker";

export default function Test4(props) {
    //TODO: fix time validation
  const [value, setValue] = useState();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

  const onChange = (e, field_name = null) => {
    setValue({
      ...value,
      [field_name ? field_name : e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // required
    setSaveTrigger(saveTrigger + 1);
    const validated =
      validStatus &&
      !Object.keys(validStatus).some((item) => validStatus[item] === false);

    if (validated) {
      alert("Valid");
      console.log(value);
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      <TimePicker
        name="timepicker"
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        onChange={onChange}
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
