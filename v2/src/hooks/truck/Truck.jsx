import { Fragment } from "react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import TextField from "../../components/inputs/TextField";

export default function useTruckDetails(props) {
  const [value, setValue] = useState();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [validStatus, setValidStatus] = useState();
  const [count, setCount] = useState(props?.count || 2);

  useEffect(() => {
    let trucks = [];
    let validity = [];

    console.log("here");

    for (let i = 0; i < count; i++) {
      trucks.push({
        vehicle_registration_number: "",
        licence_number: "",
        model: "",
        water_grade: "",
        maximum_capacity: "",
        minimum_capacity: "",
        iot_device: "",
      });
      validity.push({
        vehicle_registration_number: "",
      });
    }
    setValue(trucks);
    setValidStatus(validity);
  }, [count]);

  //   useEffect(() => {
  //     if (props?.saveTrigger !== prevSaveTrigger) {
  //       setPrevSaveTrigger(props?.saveTrigger);
  //       // run validations
  //       setShowValidations(true);
  //     }
  //   }, [props?.saveTrigger]);

  const onChange = (e, field_name = null, key) => {
    let trucks = [...value];
    let truckObj = { ...trucks[key] };
    let modified_truckObj = {
      ...truckObj,
      [field_name]: e.target.value,
    };
    trucks[key] = modified_truckObj;
    setValue(trucks);
  };

  const setMiddleValidStatus = (field_name, key, validated) => {
    if (field_name && key !== undefined) {
      let validity = [...validStatus];
      console.log(validity);
      validity[key] = {
        ...validity[key],
        [field_name]: validated,
      };
      setValidStatus(validity);
    }
  };

    useEffect(()=>{
        console.log(validStatus);
    },[validStatus])

//   useEffect(() => {
//     console.log(value);
//   }, [value]);

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

  const truckLayout = useMemo(() => {
    return value?.map((truckObj, key) => {
      return (
        <Fragment key={key}>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            Vehicle Registration Number*:
            <TextField
              index={key}
              name="vehicle_registration_number"
              type="text"
              value={truckObj?.vehicle_registration_number}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
              required
            />
            {/* Licence Number*:
            <TextField
              index={key}
              name="licence_number"
              type="text"
              value={truckObj?.licence_number}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
              required
            /> */}
            {/* Model *:
            <TextField
              index={key}
              name="model"
              type="text"
              value={truckObj?.model}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={() =>
                setMiddleValidStatus(key)
              }
              setValue={setValue}
            />
            Maximum Capacity*:
            <TextField
              index={key}
              name="maximum_capacity"
              type="text"
              value={truckObj?.maximum_capacity}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={() =>
                setMiddleValidStatus("minimum_capacity", key)
              }
              setValue={setValue}
              required
            />
            Minimum Capacity*:
            <TextField
              index={key}
              name="minimum_capacity"
              type="text"
              value={truckObj?.minimum_capacity}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={() =>
                setMiddleValidStatus("minimum_capacity", key)
              } // required
              setValue={setValue}
              required
            /> */}
          </div>
        </Fragment>
      );
    });
  }, [value, saveTrigger]);

  return [count, setCount, truckLayout];
}
