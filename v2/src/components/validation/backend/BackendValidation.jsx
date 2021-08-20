import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function BackendValidation(props) {
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [showValidations, setShowValidations] = useState(false);
  const [fieldValue, setFieldValue] = useState();

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
      setFieldValue(props?.values?.[props?.field_name]);
      // run validations
      setShowValidations(true);
    } else if (props?.values?.[props?.field_name] !== fieldValue) {
      setShowValidations(false);
    }
  }, [props?.saveTrigger, props?.values]);

  useEffect(() => {}, [props?.values]);
  return props?.errors && props?.show && showValidations ? (
    <div style={{
        color: 'red'
    }}>{props?.errors?.[props?.field_name]}</div>
  ) : (
    <></>
  );
}

BackendValidation.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  values: PropTypes.array.isRequired,
  field_name: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
};
