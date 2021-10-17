import { React, useState } from "react";
import Button from "../components/buttons/Button";
import PasswordConfirmation from "../components/inputs/PasswordConfirmation";

export default function Test2(props) {
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
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      <PasswordConfirmation
        saveTrigger={saveTrigger}
        validStatus={validStatus}
        setValidStatus={setValidStatus}
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
