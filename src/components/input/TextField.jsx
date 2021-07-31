import { Col, Form, Row } from "react-bootstrap";

const TextField = ({
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  label,
  placeholder,
  readonly = false,
  sameRow = true,
  customParameters = {},
  textBelow,
  isValid,
  validClass,
  invalidClass,
  invalidText,
  ...props
}) => {
  const showValidation = isValid !== null && isValid !== undefined && !isValid;

  const field = (
    <>
      <Form.Control
        {...customParameters?.field}
        type="text"
        name={name}
        {...(isValid === true
          ? { className: validClass }
          : { className: invalidClass })}
        value={value}
        readOnly={readonly}
        placeholder={placeholder}
        {...(defaultValue ? { defaultValue: defaultValue } : null)}
        onChange={onChange}
        required={required}
      />
      {textBelow && (
        <Form.Text {...customParameters?.textbelow}>{textBelow}</Form.Text>
      )}
      {showValidation && (
        <Form.Text className="invalid-feedback">
          {invalidText || `${name} is invalid`}
        </Form.Text>
      )}
    </>
  );

  return (
    <Form.Group
      controlId="test"
      {...customParameters?.group}
      {...(sameRow ? { as: Row } : null)}
    >
      {label ? (
        <Form.Label
          {...customParameters?.label}
          {...(sameRow ? { column: true } : null)}
        >
          {label}
          {required === true ? <span className="text-danger">*</span> : null} :
        </Form.Label>
      ) : null}
      {sameRow ? <Col {...customParameters?.column}>{field}</Col> : field}
    </Form.Group>
  );
};

export default TextField;
