import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export const Register: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      window.location.href = "/";
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className='loginWrapper'>
      <div className='login'>
        <form className='loginForm' onSubmit={handleSubmit}>
          <h1 className='loginTitle'>Registracija</h1>
          <label htmlFor='name' className='nameLabel'>
            Ime
          </label>
          <input
            type='text'
            name='name'
            required
            placeholder='Ime'
            className='name'
            value={user.name}
            onChange={(e) => onChangeInput(e)}
          />
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
              Registruj se
            </button>
            <Link to='/login' className='registerPgLoginButton'>
              Prijava
            </Link>
          </div>
        </form>
      </div>
      {/* <Loading /> */}
    </div>
  );
};
