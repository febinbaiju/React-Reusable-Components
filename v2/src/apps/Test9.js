import { React, useEffect, useMemo, useState } from "react";
import Button from "../components/buttons/Button";
import useTruckDetails from "../hooks/truck/Truck";

export default function Test9(props) {
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const [value, setValue] = useState()

  const waterGrades = useMemo(() => [
    { label: "Grade 1", value: "0" },
    { label: "Grade 2", value: "1" },
    { label: "Grade 3", value: "2" },
  ]);

  useEffect(()=>{
    console.log(value);
  },[value])

  const [truckCount, setTruckCount, truckLayout] = useTruckDetails({
    water_grade_data: waterGrades,
    saveTrigger: saveTrigger,
    validStatus: validStatus,
    value: value,
    setValue: setValue,
    count: 1,
    setValidStatus: setValidStatus,
  });

  const validated = useMemo(() => {
    var valid = true;
    if (validStatus) {
      let arr = Object.values(validStatus);
      for (var i = 0, iLen = arr.length; i < iLen; i++) {
        let o = arr[i];

        for (var p in o) {
          if (o.hasOwnProperty(p) && o[p] == false) {
            valid = false;
            break;
          }
        }
        if (!valid) break;
      }
    } else valid = false;

    return valid
  });

  const handleSubmit = () => {
    // required
    setSaveTrigger(saveTrigger + 1);

    if (validated) {
      alert("Valid");
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      <Button
        name="add"
        type="button"
        value="Add Truck"
        onClick={(e) => setTruckCount(truckCount + 1)}
      />
      {truckLayout}
      <Button
        name="submit"
        type="submit"
        value="Check"
        onClick={handleSubmit}
      />
    </>
  );
}
