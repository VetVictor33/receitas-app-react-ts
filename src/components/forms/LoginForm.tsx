import { Formik, Form, Field, ErrorMessage } from 'formik';
import { INVALID_EMAIL, REQUIRED_DATA } from '../../utils/globalErrorMessages';
import { Button } from '@mui/material';
import Api from '../../services/API/api';
import { useNavigate } from 'react-router-dom'
import { setItem } from '../../storage';


export default function LoginForm(){
  const navigateTo = useNavigate()
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = REQUIRED_DATA;
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = INVALID_EMAIL;
        }
        if(!values.password) {
          errors.password = REQUIRED_DATA
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const {token} = await Api.loginAttempt(values)
          setSubmitting(false)
          setItem('token', token)
          navigateTo('/dashboard')
        } catch (error) {
          console.log(error.response.data.errors)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <Button variant="contained"
            type='submit'
            disabled={isSubmitting}>
              Cadastrar</Button>
        </Form>
      )}
    </Formik>
  )
}