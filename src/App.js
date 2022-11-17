import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import FormSchema from './FormSchema';



function App() {
  return (
    <div className="App">
       
      <Formik
        initialValues={{
          password: '',
          passwordconfirmation: '',
        }}
        validationSchema={FormSchema}
        onSubmit={values => {
          console.log(values)
        }}
      >

        {({ errors, touched }) => (
          <Form>

            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <Field name="passwordConfirmation" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <div>{errors.passwordConfirmation}</div>
            ) : null}

          </Form>
        )}

      </Formik>

    </div>
  );
}

export default App;
