import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const yes = "true";

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", JSON.parse(yes));

      window.location.href = "/";
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className='loginWrapper'>
      <div className='login'>
        <form className='loginForm' onSubmit={handleSubmit}>
          <h1 className='loginTitle'>Prijava</h1>
          <label htmlFor='email' className='emailLabel'>
            Email
          </label>
          <input
            type='email'
            name='email'
            required
            placeholder='Email'
            className='email'
            value={user.email}
            onChange={(e) => onChangeInput(e)}
          />
          <label htmlFor='password' className='passwordLabel'>
            Lozinka
          </label>
          <input
            type='password'
            name='password'
            required
            placeholder='Lozinka'
            className='password'
            value={user.password}
            autoComplete='on'
            onChange={(e) => onChangeInput(e)}
          />

          <div className='loginButtons'>
            <button type='submit' className='loginButton'>
              Prijavi se
            </button>
            <Link to='/register' className='registerButton'>
              Registracija
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
