import { useFormik } from "formik";
import { Form } from "react-bootstrap";

export const BaseForm = (
    {
        ...props        
    }
) => {
    const formik = useFormik({
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      return(<Form noValidate
        onSubmit={formik.handleSubmit}
        >
            {props.children}
        </Form>)
}