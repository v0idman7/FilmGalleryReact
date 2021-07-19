import './SignUp.scss';

import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { regUser } from '../../store/actions';

const getUser = (state) => state.users.users;
const getAdmin = (state) => state.users.admin;

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(getUser);
  const admin = useSelector(getAdmin);

  const checkUser = (email) => {
    if (admin.email === email) {
      formik.setStatus('User with this email is already registered');
      return false;
    } else {
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].email === email) {
          formik.setStatus('User with this email is already registered');
          return false;
        }
      }
    }
    return true;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      surname: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password mismatch').min(6, 'Must be 6 characters or more').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      if (checkUser(values.email)){
        const user = {
          "name": values.name,
          "surname": values.surname,
          "password": values.password,
          "email": values.email,
        };
        dispatch(regUser(user))
        history.push('/');
      };
    },
  });

  return ( 
    <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
      <fieldset  className="form form-signUp">
        <legend className="form__title">Registration</legend>
        {formik.status ? <div className="form__alert">{formik.status}</div> : null}
        <input 
          className="form__input name" 
          name="name" 
          type="text" 
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="form__alert">{formik.errors.name}</div>
        ) : null}
        <input 
          className="form__input surname" 
          name="surname" 
          type="text" 
          placeholder="Surname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.surname} 
        />
        {formik.touched.surname && formik.errors.surname ? (
          <div className="form__alert">{formik.errors.surname}</div>
        ) : null}
        <input 
          className="form__input reg-password1" 
          name="password" 
          type="password" 
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password} 
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="form__alert">{formik.errors.password}</div>
        ) : null}
        <input 
          className="form__input reg-password2" 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword} 
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="form__alert">{formik.errors.confirmPassword}</div>
        ) : null}
        <input 
          className="form__input reg-email" 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email} 
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="form__alert">{formik.errors.email}</div>
        ) : null}
        <div className="form__buttons">
          <button className="form__signUp" type="submit" disabled={!formik.isValid || !formik.dirty}>SignUp</button>
          <button className="form__clear" type="reset">Clear</button>
        </div>
      </fieldset>
    </form>
  );
}

export default SignUp;