import { React, useEffect, useState } from "react";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import { enableRipple } from "@syncfusion/ej2-base";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import lodash from "lodash";
import { useMemo } from "react";
import { convertFieldName } from "../../lib/utils/convertors";
import PropTypes from "prop-types";

enableRipple(true);

export default function TimePicker(props) {
  const [value, setValue] = useState(props?.value || null);
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => true);

  const onChange = (e) => {
    setValue({
      ...value,
      [props?.name]: e.target.value,
    });
    props?.onChange(e, props?.name);
  };

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
      if (props?.required && !value) {
        validated = false;
        setInvalidMessages({
          message: convertFieldName(props?.name) + " is required",
          validated: false,
        });
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
      }
      else if (typeof props?.setValidStatus === "function") {
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
    }
  }, [props?.required, value]);

  return (
    props?.show !== false && (
      <>
        <TimePickerComponent
          {...(props?.className ? { className: props?.className } : null)}
          placeholder={props?.placeholder || "Select a Time"}
          {...(props?.value ? { value: props?.value } : null)}
          {...(props?.step ? { step: props?.step } : null)}
          {...(props?.min ? { min: props?.min } : null)}
          {...(props?.max ? { max: props?.max } : null)}
          {...(props?.format ? { format: props?.format } : null)}
          onChange={onChange}
        />
        {showValidations ? (
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

TimePicker.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  value: PropTypes.string.isRequired,
  min: PropTypes.func,
  max: PropTypes.func,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  validStatus: PropTypes.object,
  saveTrigger: PropTypes.number.isRequired,
  setValidStatus: PropTypes.func,
};
