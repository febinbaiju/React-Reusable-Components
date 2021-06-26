import { Button } from "react-bootstrap";
import TextField from '../../components/input/TextField'
import { BaseForm } from "../../components/forms/BaseForm";

export default function TestForm(props) {

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
      }

    return(<BaseForm fields={fields}>
        <TextField name="first_name" placeholder="Enter First Name" label="First Name" customParameters={customParameters} required min={5} max={10} {...props} />
        <TextField name="last_name" placeholder="Enter Last Name" label="Last Name" customParameters={customParameters} required {...props} />
        <Button type="submit">Submit form</Button>
        </BaseForm>)
}