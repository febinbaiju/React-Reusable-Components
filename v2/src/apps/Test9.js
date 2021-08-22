import { React, useMemo, useState } from "react";
import Button from "../components/buttons/Button";
import useTruckDetails from "../hooks/truck/Truck";

export default function Test9(props) {
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const waterGrades = useMemo(()=>([
    { label: "Grade 1", value: "0" },
    { label: "Grade 2", value: "1" },
    { label: "Grade 3", value: "2" },
  ]));

  const [truckCount, setTruckCount, truckLayout] = useTruckDetails({
    water_grade_data: waterGrades,
    saveTrigger: saveTrigger,
  });

  const handleSubmit = () => {
    // required
    setSaveTrigger(saveTrigger + 1);
    const validated =
      validStatus &&
      !Object.keys(validStatus).some((item) => validStatus[item] === false);

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
