import './SignIn.scss';

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions';

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const admin = useSelector((state) => state.users.admin);

  return ( 
    <Formik 
      initialValues = {{
        email: '',
        password: '',
      }}
      validationSchema = {
        Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        })
      }
      validateOnBlur
      onSubmit = { (values, actions) => {
        let email = true;
        if (admin.email === values.email) {
          if (admin.password === values.password) {
            dispatch(loginUser(admin.name, true));
            history.push('/');
          } else actions.setStatus('Invalid password');
          email = false;
        } else {
          for (let i = 0; i < users.length; i += 1) {
            if (users[i].email === values.email) {
              if (users[i].password === values.password) {
                dispatch(loginUser(users[i].name, false));
                history.push('/');
              } else actions.setStatus('Invalid password');
              email = false;
            }
          }
        }
        if (email) actions.setStatus('This user does not exist');
      }}
    >
      {({values, errors, status, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
        <fieldset  className="form form-signIn">
          <legend className="form__title">Sign In</legend>
          {status ? <div className="form__alert">{status}</div> : null}
          <input 
            className="form__input email" 
            name="email" 
            type="email" 
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email ? (
            <div className="form__alert">{errors.email}</div>
          ): null}
          <input
            className="form__input password"
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
          <div className="form__buttons">
            <button 
              className="form__sign" 
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid || !dirty}
            >Sign</button>
            <Link className="form__toReg" to="/SignUp">Registration</Link>
          </div>
        </fieldset>
      )}
    </Formik>
  );
}

export default SignIn;