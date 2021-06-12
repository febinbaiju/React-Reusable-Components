import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { TextField } from '../../components/input/TextField'
import { PasswordField } from '../../components/input/PasswordField'
import { BaseForm } from "../../components/forms/BaseForm";

export default function TestForm2(props) {

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


    return(<BaseForm>
        <TextField name="name" placeholder="Enter Name" label="Name:" customParameters={customParameters} required {...props} />
        <PasswordField name="password" placeholder="Enter Password" label="Password:" customParameters={customParameters} {...props} />
        <PasswordField name="confirm_password" placeholder="Confirm Password" label="Confirm Password:" customParameters={customParameters} required {...props} />
        <Button type="submit">Submit form</Button>
        </BaseForm>)
}