import './SignIn.scss';

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions';

const getUser = (state) => state.users.users;
const getAdmin = (state) => state.users.admin;

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(getUser);
  const admin = useSelector(getAdmin);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),
    onSubmit: values => {
      let email = true;
      if (admin.email === values.email) {
        if (admin.password === values.password) {
          dispatch(loginUser(admin.name, true));
          history.push('/');
        } else formik.setStatus('Invalid password');
        email = false;
      } else {
        for (let i = 0; i < users.length; i += 1) {
          if (users[i].email === values.email) {
            if (users[i].password === values.password) {
              dispatch(loginUser(users[i].name, false));
              history.push('/');
            } else formik.setStatus('Invalid password');
            email = false;
          }
        }
      }
      if (email) formik.setStatus('This user does not exist');
    },
  });

  return ( 
    <form onSubmit={formik.handleSubmit}>
      <fieldset  className="form form-signIn">
        <legend className="form__title">Sign In</legend>
        {formik.status ? <div className="form__alert">{formik.status}</div> : null}
        <input 
          className="form__input email" 
          name="email" 
          type="email" 
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="form__alert">{formik.errors.email}</div>
        ): null}
        <input
          className="form__input password"
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
        <div className="form__buttons">
          <button 
            className="form__sign" 
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >Sign</button>
          <Link className="form__toReg" to="/SignUp">Registration</Link>
        </div>
      </fieldset>
    </form>
  );
}

export default SignIn;