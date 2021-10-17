import { Fragment } from "react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/buttons/Button";
import TextField from "../../components/inputs/TextField";
import DropDown from "../../components/dropdown/DropDown";

export default function useTruckDetails(props) {
  const [value, setValue] = useState();
  const [validStatus, setValidStatus] = useState();
  const [count, setCount] = useState(props?.count || 0);

  const [selectedWaterGrade, setSelectedWaterGrade] = useState({});

  useEffect(() => {
    let trucks = [];
    let validity = [];

    for (let i = 0; i < count; i++) {
      trucks.push({
        vehicle_registration_number:
          value?.[i]?.vehicle_registration_number || "",
        licence_number: value?.[i]?.licence_number || "",
        model: value?.[i]?.model || "",
        water_grade: value?.[i]?.water_grade || "",
        maximum_capacity: value?.[i]?.maximum_capacity || "",
        minimum_capacity: value?.[i]?.minimum_capacity || "",
        iot_device: value?.[i]?.iot_device || "",
      });
      validity.push({});
    }
    setValue(trucks);
    props?.setValue(trucks);
    setValidStatus(validity);
    props?.setValidStatus(validity);
  }, [count]);

  const onChange = (e, field_name = null, key) => {
    let trucks = [...value];
    let truckObj = { ...trucks[key] };
    let modified_truckObj = {
      ...truckObj,
      [field_name]: e.target.value,
    };
    trucks[key] = modified_truckObj;

    if (field_name === "water_grade") {
      setSelectedWaterGrade((data) => ({
        ...data,
        [key]: e.target.value,
      }));
    }
    props?.setValue(trucks);
    setValue(trucks);
  };

  const setMiddleValidStatus = (field_name, key, validated) => {
    if (field_name && key !== undefined) {
      setValidStatus((datas) => ({
        ...datas,
        [key]: {
          ...datas[key],
          [field_name]: validated,
        },
      }));

      props?.setValidStatus((datas) => ({
        ...datas,
        [key]: {
          ...datas[key],
          [field_name]: validated,
        },
      }));
    }
  };

  const removeField = (key) => {
    const trucks = [...value];
    trucks.splice(key, 1);
    props?.setValue(trucks);
    setValue(trucks);

    const validity = Object.values(validStatus);
    validity.splice(key, 1);
    let newObj = Object.assign({}, validity);
    setValidStatus(newObj);
    props?.setValidStatus(newObj);

    const removeSelectedWaterGrade = {...selectedWaterGrade}
    delete removeSelectedWaterGrade[key]
    const refreshObj = Object.values(removeSelectedWaterGrade)
    setSelectedWaterGrade(Object.assign({}, refreshObj))

    setCount(count - 1);
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
              saveTrigger={props?.saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
              required
            />
            Licence Number*:
            <TextField
              index={key}
              name="licence_number"
              type="text"
              customErrorMessage="Please enter licence number"
              value={truckObj?.licence_number}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={props?.saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
              required
            />
            Model *:
            <TextField
              index={key}
              name="model"
              type="text"
              value={truckObj?.model}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={props?.saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
            />
            Water Grade:
            <DropDown
              index={key}
              name="water_grade"
              data={props?.water_grade_data?.filter((item) => {
                let selected = Object.keys(selectedWaterGrade)
                  .filter((sel_key) => {
                    return sel_key != key;
                  })
                  .map((sel_key) => {
                    return selectedWaterGrade[sel_key];
                  });
                return !selected.includes(item?.value);
              })}
              value={props?.water_grade_data.find((wa) => {
                return wa?.value === value?.[key]?.water_grade;
              })}
              onChange={(e) => onChange(e, "water_grade", key)}
              saveTrigger={props?.saveTrigger} // required
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
            />
            Maximum Capacity*:
            <TextField
              index={key}
              name="maximum_capacity"
              type="text"
              value={truckObj?.maximum_capacity}
              onChange={(e) => onChange(e, e.target.name, key)}
              saveTrigger={props?.saveTrigger}
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
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
              saveTrigger={props?.saveTrigger}
              validStatus={validStatus} // required
              setValidStatus={setMiddleValidStatus}
              setValue={setValue}
              required
            />
            <Button
              type="button"
              onClick={() => {
                removeField(key);
              }}
              value={"Remove"}
            />
          </div>
        </Fragment>
      );
    });
  }, [value, props?.saveTrigger]);

  return [count, setCount, truckLayout];
}
