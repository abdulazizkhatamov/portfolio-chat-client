import * as Yup from 'yup'

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(1, 'First name is required')
    .required('First name is required'),
  last_name: Yup.string()
    .min(1, 'Last name is required')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})
