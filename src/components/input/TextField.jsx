import { Col, Form, Row } from "react-bootstrap"

export const TextField = ({
    name,
    value,
    defaultValue,
    onChange,
    setValue,
    required,
    label,
    placeholder,
    readonly = false,
    sameRow = true,
    customParameters = {},
    textBelow,
    isValid,
    validClass,
    invalidClass,
    ...props
}) =>{
    const field = <>
    <Form.Control
    {
        ...customParameters?.field
    }
    type="text"
    {...(isValid === true ? { className: validClass } : { className : invalidClass })}
    value={value}
    readOnly={readonly}
    placeholder={placeholder}
    {...(defaultValue ?  {defaultValue : defaultValue } : null )}
    onChange={setValue}
    required
    />
    {
        textBelow &&
        <Form.Text
        {
            ...customParameters?.textbelow
        }
        >
        {textBelow}
        </Form.Text>
    }
    </>

    return(
    <Form.Group
    {
        ...customParameters?.group
    }
    {...(sameRow ? { as: Row} : null )}
    >
    { label ? 
    <Form.Label
    {
        ...customParameters?.label
    }
    {...(sameRow ? { column: true } : null )} 
    >
      {label}
    </Form.Label>
    :
    null
    }
    { sameRow ?
    <Col
    {
        ...customParameters?.column
    }
    >
    {field}
    </Col>
    :
    field
    }
       </Form.Group>
        )
}