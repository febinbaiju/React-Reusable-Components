import { useEffect, useMemo } from "react";
import { useState } from "react";
import lodash from "lodash";
import { convertFieldName } from "../../lib/utils/convertors";
import PropTypes from "prop-types";
import React from "react";

export default function DropDown(props) {
  const [value, setValue] = useState();
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => true);

  useEffect(() => {
    let key = lodash.findKey(props?.data, { checked: true });
    if (key) {
      setValue(props?.data[key].value);
    }
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
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
      if (typeof props?.setValidStatus === "function") {
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
        <select onChange={onChange}>
          <option value={""}>--Select--</option>
          {props?.data?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <option
                  {...(item?.checked ? { selected: true } : null)}
                  value={item?.value}
                >
                  {item?.label}
                </option>
              </React.Fragment>
            );
          })}
        </select>
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
  required: PropTypes.bool.isRequired,
  validStatus: PropTypes.object,
  saveTrigger: PropTypes.number.isRequired,
  setValidStatus: PropTypes.func,
};
