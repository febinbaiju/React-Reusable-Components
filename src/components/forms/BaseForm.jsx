import { useFormik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

export const BaseForm = (
    {
      fields = {},
        ...props        
    }
) => {

  const form = useFormik({
    initialValues: fields,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  function form_fields(element, index)
  {
    switch(element.type.name)
    {
      case "TextField":
        return(React.cloneElement(element, {onChange: form.handleChange, value: form.values.name, key: index}))
      default:
        return React.cloneElement(element, { key: index })
    }
  }

      return(<Form noValidate
        onSubmit={form.handleSubmit}
        >
          {props.children.map((element, index) => {
            return(form_fields(element, index))
          })}
        </Form>)
}