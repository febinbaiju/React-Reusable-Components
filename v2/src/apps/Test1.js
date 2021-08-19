import { React, useEffect, useState } from "react";
import PasswordConfirmation from "../components/inputs/PasswordConfirmation";
import TextField from "../components/inputs/TextField";
import { api } from "../lib/api/base";

export default function Test1(props) {
  const [value, setValue] = useState();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
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
        value={value}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
      />
      Last Name:
      <TextField
        name="last_name"
        value={value}
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
        value={value}
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
        value={value}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
      />
      Float:
      <TextField
        type="float"
        name="some_field"
        value={value}
        onChange={onChange}
        saveTrigger={saveTrigger} // required
        validStatus={validStatus} // required
        setValidStatus={setValidStatus} // required
        required
        min={2}
      />
      <PasswordConfirmation
        onChange={onChange}
        saveTrigger={saveTrigger}
        validStatus={validStatus}
        setValidStatus={setValidStatus}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
