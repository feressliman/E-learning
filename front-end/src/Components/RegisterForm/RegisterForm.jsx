import React from 'react'
import '../LoginForm/LoginForm'

const RegisterForm = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder='Username' required />
        </div>
        <div className="input-box">
          <input type="text" placeholder='Email' required />
        </div>
        <div className="input-box">
          <input type="text" placeholder='Tel' required />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          <p>Have an account?<a href="/">Login</a> </p>
        </div>
      </form>

    </div>
  );
};

export default RegisterForm;