import React, { useEffect, useMemo, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import bookWaterStyles from "../../styles/BookWater";
import lodash, { reduce } from "lodash";
import { Text } from "react-native";

export default function DropDown(props) {
  const [control, setControl] = useState(false);
  const [value, setValue] = useState(props?.current_value || null);

  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => !props?.disabled === true);

  useEffect(() => {
    if (props?.current_value != "") {
      setValue(props?.current_value);
    }
  }, [props?.current_value]);

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
      // run validations
      setShowValidations(true);
    }
  }, [props?.saveTrigger]);

  useEffect(() => {
    var validated = true;
    if (runValidations) {
      // start of common validations
      if (props?.required) {
        if (!props?.current_value) {
          validated = false;
          setInvalidMessages({
            // message: props?.customErrorMessage
            //   ? props?.customErrorMessage
            //   : convertFieldName(props?.name) + " is required",
            message: "field is required",
            validated: false,
          });
        }
      }
    }
    if (validated) {
      setInvalidMessages({
        message: "",
        validated: true,
      });
      setValid(true);
    } else {
      setValid(false);
    }
    if (
      props?.index !== undefined &&
      typeof props?.setValidStatus === "function"
    ) {
      props?.setValidStatus(props?.name, props?.index, validated);
    } else if (typeof props?.setValidStatus === "function") {
      if (!lodash.has(props.validStatus, props?.name))
        props.setValidStatus({
          ...props?.validStatus,
          [props?.name]: validated,
        });
      else if (props?.validStatus[props?.name] !== validated) {
        props.setValidStatus({
          ...props?.validStatus,
          [props?.name]: validated,
        });
      }
    }
  }, [
    runValidations,
    props?.current_value,
    props?.required,
    props?.name,
    props?.validStatus,
  ]);

  useEffect(() => {
    props?.onChange({
      name: props?.name,
      value: value,
    });
  }, [value, props?.name]);

  return (
    <>
      <DropDownPicker
        listMode="MODAL"
        open={control}
        style={
          props?.showValidation !== false &&
          showValidations &&
          props?.saveTrigger
            ? valid
              ? bookWaterStyles?.inputs
              : bookWaterStyles.error_inputs
            : bookWaterStyles.inputs
        }
        value={value}
        setValue={setValue}
        items={props?.data}
        setOpen={setControl}
        closeAfterSelecting={true}
        setItems={props?.setData}
        {...props}
      />
      {props?.showValidation !== false &&
      showValidations &&
      !valid &&
      props?.saveTrigger ? (
        <Text
          style={{
            color: "red",
          }}
        >
          {invalidMessages?.message}
        </Text>
      ) : null}
    </>
  );
}
