import PropTypes from "prop-types";

export default function Button(props) {
  return props?.show === false ? (
    <></>
  ) : (
    <button
      type={props?.type}
      name={props?.name}
      {...(props?.className ? { className: props?.className } : null)}
      {...(props?.disabled !== undefined
        ? { disabled: props?.disabled }
        : null)}
      {...(props?.onSubmit ? { onSubmit: props?.onSubmit } : null)}
      {...(props?.onClick ? { onClick: props?.onClick } : null)}
    >
      {props?.value}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
};
