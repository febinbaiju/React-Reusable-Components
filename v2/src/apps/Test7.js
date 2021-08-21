import { useMemo, useState } from "react";
import { React } from "react";
import Button from "../components/buttons/Button";
import DropDown from "../components/dropdown/DropDown";

export default function Test7(props) {
  const [value, setValue] = useState({
    group: "",
    gender: "",
  });
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

  const data = useMemo(() => [
    { label: "Male", value: "0" },
    { label: "Female", value: "1", checked: true },
    { label: "Others", value: "2" },
  ]);

  const data2 = useMemo(() => [
    { label: "Group 1", value: "3" },
    { label: "Group 2", value: "4" },
    { label: "Group 3", value: "5" },
  ]);

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
      console.log(validStatus);
    }
  };

  return (
    <>
      <div>
        <DropDown
          name="gender"
          data={data}
          saveTrigger={saveTrigger} // required
          validStatus={validStatus} // required
          setValidStatus={setValidStatus} // required
          setValue={setValue} // required
          onChange={onChange}
          required
        />
      </div>
      <div>
        <DropDown
          name="group"
          data={data2}
          saveTrigger={saveTrigger} // required
          validStatus={validStatus} // required
          setValidStatus={setValidStatus} // required
          onChange={onChange}
          required
        />
      </div>
      <Button
        name="submit"
        type="submit"
        value="Check"
        onClick={handleSubmit}
      />
    </>
  );
}
