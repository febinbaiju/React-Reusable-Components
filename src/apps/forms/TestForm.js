import { Button } from "react-bootstrap";
import TextField from '../../components/input/TextField'
import { BaseForm } from "../../components/forms/BaseForm";
import { useEffect, useState } from "react";

export default function TestForm(props) {

    const [form_values, setFormValues] = useState()

    let customParameters = {
        "group" : {
            className : "mb-3"
        },
        "label" : {
            column: true,
            sm: 2
        },
        "field" : {

        },
        "column" : {
            sm: 10
        },
        "textbelow" : {
            className: "text-muted"
        }
    }

    let fields = {
        first_name: '',
        last_name: '',
        address: ''
      }

    
    let validation_parameters = [
        {
            'compare': 'first_name',
            'compare_to': 'last_name',
            'operation': '!=',
            'message': 'First Name should not be same as Last Name'
        }
    ]
    

    useEffect(() => {
        console.log(form_values);
    }, [form_values])

    return(<BaseForm fields={fields} fields_validation_rules={validation_parameters} set_form_values={setFormValues}>
        <TextField name="first_name" placeholder="Enter First Name" label="First Name" customParameters={customParameters} required min={5} max={10} {...props} />
        <TextField name="last_name" placeholder="Enter Last Name" label="Last Name" customParameters={customParameters} required max={10} {...props} />
        <TextField name="address" placeholder="Enter Address" label="Address" customParameters={customParameters} {...props} />
        <Button type="submit">Submit form</Button>
        </BaseForm>)
}