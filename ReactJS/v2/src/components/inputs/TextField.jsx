import { React, useEffect, useMemo, useState } from "react";
import {
  convertFieldName,
  validateNumber,
  validateEmail,
  validateFloatNumber,
  stringToRegex,
} from "../../lib/utils/convertors";
import lodash from "lodash";
import PropTypes from "prop-types";

export default function TextField(props) {
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
        if (!props?.value) {
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
      if (validated && props?.min && props?.value) {
        if (!props?.value || props?.value.toString().length < props?.min) {
          validated = false;
          setInvalidMessages({
            message: props?.customErrorMessage
              ? props?.customErrorMessage
              : convertFieldName(props?.name) +
                " should be minimum " +
                props?.min +
                " characters",
            validated: false,
          });
        }
      }
      if (validated && props?.max && props?.value) {
        if (!props?.value || props?.value.toString().length > props?.max) {
          validated = false;
          setInvalidMessages({
            message: props?.customErrorMessage
              ? props?.customErrorMessage
              : convertFieldName(props?.name) +
                " should not be more than " +
                props?.max +
                " characters",
            validated: false,
          });
        }
      }
      //end of common validations

      if (validated && props?.type && props?.value) {
        // start of type based validations

        switch (props?.type) {
          case "number":
            if (!validateNumber(props?.value)) {
              validated = false;
              setInvalidMessages({
                message: props?.customErrorMessage2
                  ? props?.customErrorMessage2
                  : convertFieldName(props?.name) + " should be only numbers",
                validated: false,
              });
            }
            break;
          case "email":
            if (!validateEmail(props?.value)) {
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
            if (!pattern.test(props?.value)) {
              validated = false;
              setInvalidMessages({
                message: "Invalid Name",
                validated: false,
              });
            }
            break;
          case "regex":
            var pattern = new RegExp(stringToRegex(props?.regex));
            if (!pattern.test(props?.value)) {
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
            if (!validateFloatNumber(props?.value)) {
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
    props?.value,
    props?.required,
    props?.min,
    props?.max,
    props?.name,
    props?.validStatus,
  ]);

  const onChange = (e) => {
    props?.onChange(e);
  };

  return (
    props?.show !== false && (
      <>
        <label for={props?.name}>
          {props?.label}
          {props?.required ? (
            <span
              style={{
                color: "red",
              }}
            >
              {" "}
              *
            </span>
          ) : null}{" "}
          :
        </label>
        <input
          {...(props?.className ? { className: props?.className } : null)}
          name={props?.name}
          {...(props?.disabled ? { disabled: props?.disabled } : null)}
          {...(props?.placeholder ? { placeholder: props?.placeholder } : null)}
          type={props?.type === "password" ? "password" : "text"}
          value={props?.value}
          onChange={onChange}
        />
        {props?.showValidation !== false && showValidations ? (
          <div
            style={{
              color: "red",
            }}
          >
            {invalidMessages.message}
          </div>
        ) : (
          <div></div>
        )}
      </>
    )
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  showValidation: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  validStatus: PropTypes.object,
  saveTrigger: PropTypes.number.isRequired,
  setValidStatus: PropTypes.func,
  customErrorMessage: PropTypes.string,
};
