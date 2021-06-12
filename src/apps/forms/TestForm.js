import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { TextField } from '../../components/input/TextField'
import { PasswordField } from '../../components/input/PasswordField'

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


    const formik = useFormik({
        initialValues: {
          name: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    return(<Form noValidate
        onSubmit={formik.handleSubmit}
        >
        <TextField name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Enter Name" label="Name:" customParameters={customParameters} required {...props} />
        <PasswordField name="password" placeholder="Enter Password" label="Password:" customParameters={customParameters} {...props} />
        <PasswordField name="confirm_password" placeholder="Confirm Password" label="Confirm Password:" customParameters={customParameters} required {...props} />
        <Button type="submit">Submit form</Button>
        </Form>)
}