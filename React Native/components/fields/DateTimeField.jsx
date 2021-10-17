import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import bookWaterStyles from "../../styles/BookWater";
import lodash from "lodash";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DateTimeField(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => !props?.disabled === true);

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

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    props?.onChange({
      name: props?.name,
      value:
        props?.mode === "time"
          ? date.toLocaleTimeString("en-GB")
          : formatDate(date),
    });
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
        <View pointerEvents="none">
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={
                props?.showValidation !== false &&
                showValidations &&
                props?.saveTrigger
                  ? valid
                    ? [
                        props?.style ? props?.style : bookWaterStyles?.inputs,
                        { justifyContent: "flex-end", flex: 1 },
                      ]
                    : [
                        props?.style
                          ? props?.style
                          : bookWaterStyles?.error_inputs,
                        { justifyContent: "flex-end", flex: 1 },
                      ]
                  : [
                      props?.style ? props?.style : bookWaterStyles?.inputs,
                      { justifyContent: "flex-end", flex: 1 },
                    ]
              }
              showSoftInputOnFocus={false}
              {...(props?.placeholder
                ? {
                    placeholder: props?.placeholder,
                  }
                : null)}
              value={props?.current_value}
            />
            <FontAwesome5
              style={{
                position: "absolute",
                top: 15,
                right: 10,
              }}
              name={props?.mode === "date" ? "calendar-alt" : "clock"}
              color={props?.iconColor ? props?.iconColor : "black"}
              size={props?.iconSize ? props?.iconSize : 14}
            />
          </View>
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
        </View>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode={props?.mode || "date"}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        {...props}
      />
    </>
  );
}
