import { useEffect, useMemo } from "react";
import { useState } from "react";
import lodash from "lodash";
import { convertFieldName } from "../../lib/utils/convertors";
import PropTypes from "prop-types";
import Select from "react-select";

export default function DropDown(props) {
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => true);

  const onChange = (e) => {
    let eU = {
      target: {
        value: props?.multiple ? e : e?.value,
      },
    };
    props?.onChange(eU, props?.name);
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
      if (props?.required && !props?.value) {
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
      } else if (typeof props?.setValidStatus === "function") {
        if (!lodash.has(props.validStatus, props?.name)) {
          props.setValidStatus({
            ...props?.validStatus,
            [props?.name]: validated,
          });
        } else if (props?.validStatus[props?.name] !== validated) {
          props.setValidStatus({
            ...props?.validStatus,
            [props?.name]: validated,
          });
        }
      }
    }
  }, [props?.required, props?.value, props?.name, props?.saveTrigger]);

  return (
    props?.show !== false && (
      <>
        <Select
          {...(props?.className ? { className: props?.className } : null)}
          {...(props?.multiple ? { isMulti: props?.multiple } : null)}
          {...(props?.maxLimit
            ? {
                isOptionDisabled: (option) =>
                  props?.value?.length >= props?.maxLimit,
              }
            : null)}
          name={props?.name}
          value={props?.value}
          {...(props?.clearable ? { isClearable: props?.clearable } : null)}
          options={props?.data}
          onChange={(option) => onChange(option)}
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

DropDown.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  required: PropTypes.bool,
  validStatus: PropTypes.object,
  saveTrigger: PropTypes.number.isRequired,
  setValidStatus: PropTypes.func,
};
