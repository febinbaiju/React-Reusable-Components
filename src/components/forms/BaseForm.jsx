import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import * as Yup from 'yup';
import FieldToLabel from "../../libs/utils/FieldToLabel";

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
    var queryBuilder = {}
    props?.children?.map((element) => {
      if(element?.props?.name)
      {
        var validationBuilder = Yup.string()
        if(element?.props?.min)
        {
          validationBuilder = validationBuilder.min(element?.props?.min,`${FieldToLabel(element?.props?.name)} should be minimum ${element?.props?.min} characters`)
        }
        if(element?.props?.max)
        {
          validationBuilder = validationBuilder.max(element?.props?.max,`${FieldToLabel(element?.props?.name)} should not be more than ${element?.props?.max} characters`)
        }
        if(element?.props?.required)
        {
          validationBuilder = validationBuilder.required(`${FieldToLabel(element?.props?.name)} is Required`)
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
    let field_name = element?.props?.name
    let showValidStatus = form?.errors && form.touched?.[field_name]
    let validationStatus = !form.errors?.[field_name]

    switch(element.type.name)
    {
      case "TextField":
        return(React.cloneElement(element, {
          ...(showValidStatus ? { 
            isValid: validationStatus,
            invalidClass: element.props?.inValidClass || "is-invalid",
            invalidText: form?.errors?.[field_name]
          } : null),
          ...(showValidStatus && element.props?.validClass ? { validClass: element.props?.validClass } : null),
          onChange: form.handleChange,
          value: form.values.name,
          key: index
          }))
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