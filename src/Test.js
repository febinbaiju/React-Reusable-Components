import { Button, Form } from "react-bootstrap";
import { PasswordField } from "./components/input/PasswordField";
import { TextField } from "./components/input/TextField";

export default function Test(props) {
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
    return(
        <>
        <Form noValidate onSubmit={(event)=>{
            const form = event.currentTarget
            console.log(form.checkValidity())
            event.preventDefault()
            event.stopPropagation()
        }}
        validated={false}
        >
        <TextField name="name" placeholder="Enter Name" label="Name:" customParameters={customParameters} required {...props} />
        <PasswordField name="password" placeholder="Enter Password" label="Password:" customParameters={customParameters} {...props} />
        <PasswordField name="confirm_password" placeholder="Confirm Password" label="Confirm Password:" customParameters={customParameters} required {...props} />
        <Button type="submit">Submit form</Button>
        </Form>
        </>
    )
}