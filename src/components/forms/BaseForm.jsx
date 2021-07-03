import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import * as Yup from 'yup';
import FieldToLabel from "../../libs/utils/FieldToLabel";
import { EqualStringFields, NotEqualStringFields } from "./helpers/validation/multiple_elements/StringValidationHelpers";
import { EqualStringField, NotEqualRegexStringField, NotEqualStringField } from "./helpers/validation/single_element/StringValidation";

export const BaseForm = (
    {
      fields = {},
      multiple_fields_validation_rules = {},
      individual_fields_validation_rules = {},
      set_form_values = null,
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
      const stringElement = ["TextField"].includes(element?.type?.name)

      if(element?.props?.name)
      {
        var validationBuilder = Yup.string()
        const form_fields = form.values

        if(typeof set_form_values === "function")
        {
          set_form_values(form_fields)
        }

      // Basic Multiple elements validations
       Object.keys(multiple_fields_validation_rules).filter((key) => {
         return multiple_fields_validation_rules[key].compare_to === element?.props?.name
        }).map((key) => {
          const rule = multiple_fields_validation_rules[key]
    
          const field_to_compare = rule['compare']
          const field_operation = rule['operation']
          const field_message = rule['message']
    
          const field1_value = form_fields[field_to_compare]

    
          switch(field_operation)
          {
            case '=i': // TODO: = operator does not seems to be working with min, max, required fields
              if(stringElement)
              validationBuilder = validationBuilder.EqualStringFields(field1_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${FieldToLabel(field_to_compare)}`, false)
              break
            case '=':
              if(stringElement)
              validationBuilder = validationBuilder.EqualStringFields(field1_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${FieldToLabel(field_to_compare)}`)
              break  
            case '!=i':
              if(stringElement)
              validationBuilder = validationBuilder.NotEqualStringFields(field1_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${FieldToLabel(field_to_compare)}`, false)
              break
            case '!=':
              if(stringElement)
              validationBuilder = validationBuilder.NotEqualStringFields(field1_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${FieldToLabel(field_to_compare)}`)
              break
            default:
              throw Error('Invalid Operation found for Field Validation')
          }
          
          return validationBuilder
        })

        // single element validations
        Object.keys(individual_fields_validation_rules).filter((key) => {
          return individual_fields_validation_rules[key].field === element?.props?.name
         }).map((key) => {
          const rule = individual_fields_validation_rules[key]
    
          const field_value = rule['compare_to_value']
          const field_operation = rule['operation']
          const field_message = rule['message']

          switch(field_operation)
          {
            case '=i':
              if(stringElement)
              validationBuilder = validationBuilder.EqualStringField(field_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${field_value}}`, false)
              break
            case '=':
              if(stringElement)
              validationBuilder = validationBuilder.EqualStringField(field_value, field_message || `${FieldToLabel(element?.props?.name)} should be same as ${field_value}}`)
              break
            case '!=':
              if(stringElement)
              validationBuilder = validationBuilder.NotEqualStringField(field_value, field_message || `${FieldToLabel(element?.props?.name)} should not be same as ${field_value})}`)
              break
            case '!=i':
              if(stringElement)
              validationBuilder = validationBuilder.NotEqualStringField(field_value, field_message || `${FieldToLabel(element?.props?.name)} should not be same as ${field_value})}`, false)
              break
            default:
              throw Error('Invalid Operation found for Field Validation')
          }
          
          return validationBuilder
        })

      
        // basic min, max, required single element validations
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
  }, [props?.children, multiple_fields_validation_rules, individual_fields_validation_rules, form?.values, set_form_values])

  Yup.addMethod(Yup.string, "EqualStringFields", EqualStringFields);
  Yup.addMethod(Yup.string, "NotEqualStringFields", NotEqualStringFields);
  Yup.addMethod(Yup.string, "NotEqualStringField", NotEqualStringField);
  Yup.addMethod(Yup.string, "EqualStringField", EqualStringField)

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