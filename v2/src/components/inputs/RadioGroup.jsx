import { useEffect, useMemo } from "react";
import { useState } from "react";
import lodash from "lodash";
import { convertFieldName } from "../../lib/utils/convertors";
import PropTypes from "prop-types";

export default function RadioGroup(props) {
  const [value, setValue] = useState(props?.value || null);
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [valid, setValid] = useState(false);
  const [invalidMessages, setInvalidMessages] = useState({
    message: "",
    validated: true,
  });
  const [showValidations, setShowValidations] = useState(false);
  const runValidations = useMemo(() => {
    let key = lodash.findKey(props?.data, { checked: true });
    if (key) {
      return false;
    } else {
      return true;
    }
  }, [props?.data]);

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
        {props?.data?.map((item, index) => {
          return (
            <>
              {item?.label}{" "}
              <input
                key={index}
                type="radio"
                {...(item?.checked ? { defaultChecked: true } : null)}
                value={item?.value}
                name={props?.name}
                onChange={onChange}
              />
            </>
          );
        })}
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

RadioGroup.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  required: PropTypes.bool.isRequired,
  validStatus: PropTypes.object,
  saveTrigger: PropTypes.number.isRequired,
  setValidStatus: PropTypes.func,
};
