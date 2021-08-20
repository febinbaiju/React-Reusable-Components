import { useState } from "react";
import { React } from "react";
import TimePicker from "../components/inputs/TimePicker";

export default function Test3(props) {
  const [value, setValue] = useState();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

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
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
