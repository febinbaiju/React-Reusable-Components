import { Button } from "react-bootstrap";
import TextField from "../../components/input/TextField";
import { BaseForm } from "../../components/forms/BaseForm";
import { useEffect, useState } from "react";

export default function TestForm(props) {
  const [form_values, setFormValues] = useState({});

  let customParameters = {
    group: {
      className: "mb-3",
    },
    label: {
      column: true,
      sm: 2,
    },
    field: {},
    column: {
      sm: 10,
    },
    textbelow: {
      className: "text-muted",
    },
  };

  let fields = {
    first_name: "",
    last_name: "",
    address: "",
  };

  let validation_parameters = [
    {
      compare: "first_name",
      compare_to: "last_name",
      operation: "=i",
      message: "First Name should be same as Last Name",
    },
  ];

  let single_element_validation = [
    {
      field: "first_name",
      operation: "!=i",
      compare_to_value: "febin",
      //'message': 'Should not be equal'
    },
    {
      field: "first_name",
      operation: "!=regex",
      compare_to_value:
        "^$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
      //'message': 'Should not be equal'
    },
  ];

  useEffect(() => {
    console.log(form_values);
  }, [form_values]);

  return (
    <>
      <h3>Example Form</h3>
      <BaseForm
        fields={fields}
        multiple_fields_validation_rules={validation_parameters}
        set_form_values={setFormValues}
        individual_fields_validation_rules={single_element_validation}
      >
        <TextField
          name="first_name"
          placeholder="Enter First Name"
          label="First Name"
          customParameters={customParameters}
          required
          min={5}
          //max={10}
          {...props}
        />
        <TextField
          name="last_name"
          placeholder="Enter Last Name"
          label="Last Name"
          customParameters={customParameters}
          required
          max={10}
          {...props}
        />
        <TextField
          name="address"
          placeholder="Enter Address"
          label="Address"
          customParameters={customParameters}
          {...props}
        />
        <Button type="submit">Submit form</Button>
      </BaseForm>
    </>
  );
}
