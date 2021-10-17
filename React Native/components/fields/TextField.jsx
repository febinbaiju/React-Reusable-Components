import React, { useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import {
  convertFieldName,
  stringToRegex,
  validateEmail,
  validateFloatNumber,
  validateNumber,
} from "../../lib/check_values";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import bookWaterStyles from "../../styles/BookWater";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TextField(props) {
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const [passwordEyeControl, setPasswordEyeControl] = useState(false);
  const runValidations = useMemo(() => !props?.disabled === true);

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
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
            message: "field is required",
            validated: false,
          });
        }
      }
      if (validated && props?.min && props?.current_value) {
        if (
          !props?.current_value ||
          props?.current_value.toString().length < props?.min
        ) {
          validated = false;
          setInvalidMessages({
            message: props?.customErrorMessage
              ? props?.customErrorMessage
              : (props?.error_label
                  ? props?.error_label
                  : convertFieldName(props?.name)) +
                " should be minimum " +
                props?.min +
                " characters",
            validated: false,
          });
        }
      }
      if (validated && props?.max && props?.current_value) {
        if (
          !props?.current_value ||
          props?.current_value.toString().length > props?.max
        ) {
          validated = false;
          setInvalidMessages({
            message: props?.customErrorMessage
              ? props?.customErrorMessage
              : (props?.error_label
                  ? props?.error_label
                  : convertFieldName(props?.name)) +
                " should not be more than " +
                props?.max +
                " characters",
            validated: false,
          });
        }
      }
      //end of common validations

      if (validated && props?.type && props?.current_value) {
        // start of type based validations

        switch (props?.type) {
          case "number":
            if (!validateNumber(props?.current_value)) {
              validated = false;
              setInvalidMessages({
                message: props?.customErrorMessage2
                  ? props?.customErrorMessage2
                  : (props?.error_label
                      ? props?.error_label
                      : convertFieldName(props?.name)) +
                    " should be only numbers",
                validated: false,
              });
            }
            break;
          case "email":
            if (!validateEmail(props?.current_value)) {
              validated = false;
              setInvalidMessages({
                message: props?.customErrorMessage2
                  ? props?.customErrorMessage2
                  : "Invalid Email",
                validated: false,
              });
            }
            break;
          case "name":
            var pattern = new RegExp(/^[a-z ,.'-]+$/i);
            if (!pattern.test(props?.current_value)) {
              validated = false;
              setInvalidMessages({
                message: "Invalid Name",
                validated: false,
              });
            }
            break;
          case "regex":
            var pattern = new RegExp(stringToRegex(props?.regex));
            if (!pattern.test(props?.current_value)) {
              validated = false;
              setInvalidMessages({
                message: props?.customErrorMessage2
                  ? props?.customErrorMessage2
                  : "Invalid Regex",
                validated: false,
              });
            }
            break;
          case "float":
            if (!validateFloatNumber(props?.current_value)) {
              validated = false;
              setInvalidMessages({
                message: props?.customErrorMessage2
                  ? props?.customErrorMessage2
                  : convertFieldName(props?.name) + "is invalid Float number",
                validated: false,
              });
            }
            break;
          default:
            break;
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
    props?.min,
    props?.max,
    props?.name,
    props?.validStatus,
  ]);

  const onChange = (e) => {
    props?.onChange({
      value: e,
      name: props?.name,
    });
  };

  return (
    props?.show !== false && (
      <View {...(props?.viewStyle ? { style: props?.viewStyle } : null)}>
        <View
          {...(props?.icon || props?.type === "password"
            ? {
                style: {
                  flexDirection: "row",
                },
              }
            : null)}
        >
          {props?.iconPosition === "left" && (
            <FontAwesome5
              style={{
                position: "absolute",
                top: 15,
                left: 10,
              }}
              name={props?.icon ? props?.icon : "search"}
              color={props?.iconColor ? props?.iconColor : "black"}
              size={props?.iconSize ? props?.iconSize : 14}
            />
          )}
          <TextInput
            {...(props?.showValidation !== false &&
            showValidations &&
            !valid &&
            props?.saveTrigger
              ? props?.icon || props?.type === "password"
                ? {
                    style: [
                      props?.style
                        ? [
                            props?.style,
                            {
                              borderColor: "red",
                            },
                          ]
                        : bookWaterStyles?.error_inputs,
                      { justifyContent: "flex-end", flex: 1 },
                    ],
                  }
                : props?.style
                ? [
                    props?.style,
                    {
                      borderColor: "red",
                    },
                  ]
                : bookWaterStyles.error_inputs
              : props?.icon || props?.type === "password"
              ? {
                  style: [
                    props?.style ? props?.style : bookWaterStyles?.inputs,
                    { justifyContent: "flex-end", flex: 1 },
                  ],
                }
              : props?.style
              ? props?.style
              : bookWaterStyles?.inputs)}
            {...(props?.type === "number"
              ? { keyboardType: "numeric" }
              : props?.type === "email"
              ? { keyboardType: "email-address" }
              : props?.type === "password" && !passwordEyeControl
              ? {
                  secureTextEntry: true,
                }
              : null)}
            {...(props?.placeholder
              ? { placeholder: props?.placeholder }
              : null)}
            onChangeText={onChange}
            value={props?.current_value}
            {...props}
          />
          {props?.type === "password" && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 15,
                right: 10,
              }}
              onPress={() => {
                setPasswordEyeControl(!passwordEyeControl);
              }}
            >
              <FontAwesome5
                name={!passwordEyeControl ? "eye-slash" : "eye"}
                color={"black"}
                size={16}
              />
            </TouchableOpacity>
          )}
          {props?.iconPosition === "right" && (
            <FontAwesome5
              style={{
                position: "absolute",
                top: 15,
                right: 10,
              }}
              name={props?.icon ? props?.icon : "search"}
              color={props?.iconColor ? props?.iconColor : "black"}
              size={props?.iconSize ? props?.iconSize : 14}
            />
          )}
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
    )
  );
}
