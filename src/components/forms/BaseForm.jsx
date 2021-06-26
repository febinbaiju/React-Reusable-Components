import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import * as Yup from 'yup';

export const BaseForm = (
    {
      fields = {},
        ...props        
    }
) => {
  const [validation_schema, setValidationSchema] = useState({})

  const form = useFormik({
    initialValues: fields,
    validationSchema: Yup.object().shape(
      validation_schema
    ),
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    useEffect(() => {
      console.log(validation_schema);
    }, [validation_schema])


  useEffect(() => {
    var queryBuilder = {}
    props?.children?.map((element, index) => {
      if(element?.props?.name)
      {
        var validationBuilder = Yup.string()
        if(element?.props?.required)
        {
          validationBuilder = validationBuilder.required(element?.props?.requiredText || "Required")
        }
         queryBuilder  =  {
          ...queryBuilder,
          [element.props.name] : validationBuilder
        }
      }
      return queryBuilder
    })
    setValidationSchema(queryBuilder) 
  }, [props?.children])

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
          {props?.children?.map((element, index) => {
            return(form_fields(element, index))
          })}
        </Form>)
}