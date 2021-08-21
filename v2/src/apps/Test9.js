import { React, useState } from "react";
import Button from "../components/buttons/Button";
import useTruckDetails from "../hooks/truck/Truck";

export default function Test9(props) {
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();

  const [truckCount, setTruckCount, truckLayout] = useTruckDetails()

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
    {
        truckLayout
    }
      <Button
        name="submit"
        type="submit"
        value="Check"
        onClick={handleSubmit}
      />
    </>
  );
}
