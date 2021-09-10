import './SignUp.scss';

import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { regUser } from '../../store/actions';

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const admin = useSelector((state) => state.users.admin);

  const checkUser = (email, actions) => {
    if (admin.email === email) {
      actions.setStatus('User with this email is already registered');
      return false;
    } else {
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].email === email) {
          actions.setStatus('User with this email is already registered');
          return false;
        }
      }
    }
    return true;
  };

  return ( 
    <Formik
      initialValues = {{
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        email: '',
      }}
      validationSchema = {
        Yup.object({
          name: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
          surname: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
          password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password mismatch').min(6, 'Must be 6 characters or more').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        })
      }
      validateOnBlur
      onSubmit = { (values, actions) => {
        if (checkUser(values.email, actions)){
          const user = {
            "name": values.name,
            "surname": values.surname,
            "password": values.password,
            "email": values.email,
          };
          dispatch(regUser(user))
          history.push('/');
        };
      }}
    >
      {({values, errors, status, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, resetForm}) => (
        <fieldset  className="form form-signUp">
          <legend className="form__title">Registration</legend>
          {status ? <div className="form__alert">{status}</div> : null}
          <input 
            className="form__input name" 
            name="name" 
            type="text" 
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.name && errors.name ? (
            <div className="form__alert">{errors.name}</div>
          ) : null}
          <input 
            className="form__input surname" 
            name="surname" 
            type="text" 
            placeholder="Surname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname} 
          />
          {touched.surname && errors.surname ? (
            <div className="form__alert">{errors.surname}</div>
          ) : null}
          <input 
            className="form__input reg-password1" 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password} 
          />
          {touched.password && errors.password ? (
            <div className="form__alert">{errors.password}</div>
          ) : null}
          <input 
            className="form__input reg-password2" 
            name="confirmPassword" 
            type="password" 
            placeholder="Confirm Password" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword} 
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <div className="form__alert">{errors.confirmPassword}</div>
          ) : null}
          <input 
            className="form__input reg-email" 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email} 
          />
          {touched.email && errors.email ? (
            <div className="form__alert">{errors.email}</div>
          ) : null}
          <div className="form__buttons">
            <button 
              className="form__signUp" 
              type="submit"
              onClick = {handleSubmit} 
              disabled={!isValid || !dirty}
            >SignUp</button>
            <button 
              className="form__clear" 
              type="reset"
              onClick={resetForm}
            >Clear</button>
          </div>
        </fieldset>
      )}
    </Formik>
  );
}

export default SignUp;