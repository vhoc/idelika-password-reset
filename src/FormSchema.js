import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'La contraseña debe tener mínimo 8 caracteres.')
      .max(100, "La contraeña no puede exceder 100 caracteres.")
      .test('isValidPass', ' debe tener al menos 1 mayúscula, 1 símbolo y 1 número.', (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value)
          const hasLowerCase = /[a-z]/.test(value)
          const hasNumber = /[0-9]/.test(value)
          const hasSymbole = /[!@#%&]/.test(value)
          let validConditions = 0
          const numberOfMustBeValidConditions = 3
          const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole]
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          )
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
  
      })
      .required('Se requiere especificar una contraseña.'),
  
      passwordConfirmation: Yup.string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres.')
        .max(100, "La contraeña no puede exceder 100 caracteres.")
        .test('isValidPass', ' debe tener al menos 1 mayúscula, 1 símbolo y 1 número.', (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value)
            const hasLowerCase = /[a-z]/.test(value)
            const hasNumber = /[0-9]/.test(value)
            const hasSymbole = /[!@#%&]/.test(value)
            let validConditions = 0
            const numberOfMustBeValidConditions = 3
            const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole]
            conditions.forEach((condition) =>
              condition ? validConditions++ : null
            )
            if (validConditions >= numberOfMustBeValidConditions) {
              return true;
            }
            return false;
  
        })
        .required('Se requiere especificar una contraseña.')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.'),
  })

  export default FormSchema