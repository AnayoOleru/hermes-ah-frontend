import React from 'react';
import Form from '../../shared/Form/Form';
import NavBar from '../../shared/NavBar/NavBar';

const navLinks = [
  {
    link: '/',
    text: 'Home',
  },
  {
    link: '/about',
    text: 'About',
  },
  {
    link: '/categories',
    text: 'Categories',
  },
];

const form = [
  { placeholder: 'Email', type: 'text' },
  { placeholder: 'Password', type: 'password' },
];
const Login = () => {
  return (
    <div>
      <NavBar navLinks={navLinks} />
      <div className="form-wrap">
        <Form
          form={form}
          forgotPassword
          loginValue="LOGIN"
          signupValue="SIGNUP"
          submitValue="LOGIN"
          spanValue="or login with"
        />
      </div>
    </div>
  );
};

export default Login;
