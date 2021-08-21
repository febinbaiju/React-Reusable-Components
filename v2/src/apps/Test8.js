import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { React } from "react";
import Button from "../components/buttons/Button";
import DropDown from "../components/dropdown/DropDown";
import lodash from 'lodash'

export default function Test8(props) {
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
          data={data.filter((item, key) => {
              return item.value !== value?.group
          }).map((item, index) =>{
              return item
          })}
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
          name="gender"
          data={data.filter((item, key) => {
            return item.value !== value?.gender
        }).map((item, index) =>{
            return item
        })}
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
