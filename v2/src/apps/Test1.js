import { React, useEffect, useState } from "react";
import PasswordConfirmation from "../components/inputs/PasswordConfirmation";
import TextField from "../components/inputs/TextField";
import { api } from "../lib/api/base";
import TimePicker from "../components/inputs/TimePicker";

export default function Test1(props) {
  const [value, setValue] = useState();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

  const onChange = (e, field_name = null) => {
    setValue({
      ...value,
      [field_name ? field_name : e.target.name]: e.target.value,
    });
  };

  // useEffect(()=>{
  //   api.get('/api/test').then(([success, response])=>{
  //     console.log("test", response, success)
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // },[])

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
      First Name:
      <TextField
        name="first_name"
        type="text"
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
      />
      Last Name:
      <TextField
        name="last_name"
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
        min={2}
        max={5}
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
      Age:
      <TextField
        type="number"
        name="age"
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
      />
      Float:
      <TextField
        show={true}
        type="float"
        name="some_field"
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
        min={2}
      />
      <PasswordConfirmation
        className="hello"
        onChange={onChange}
        saveTrigger={saveTrigger}
        validStatus={validStatus}
        setValidStatus={setValidStatus}
      />
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
