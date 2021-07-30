import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
// import {Loading} from '../../components/loading/Loading'


export const Login: React.FC = () => {
    const [user, setUser] = useState({
        email: '', password: ''
    });
    const yes = 'true';

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try { 
            await axios.post('/user/login', {...user});

            localStorage.setItem('firstLogin', JSON.parse(yes));

            window.location.href = '/';
        } catch (error:any) {
            alert(error.response.data.msg);
        }
    }

    return (
        <div className="loginWrapper">
            <div className="login">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input type="email" name="email" required
                     placeholder="Email" className="email" value={user.email} 
                     onChange={(e) => onChangeInput(e)}/>
                     
                    <input type="password" name="password" required
                     placeholder="Lozinka" className="password" value={user.password} autoComplete='on'
                     onChange={(e) => onChangeInput(e)}/>

                     <div className="loginButtons">
                         <button type="submit" className="loginButton">Prijavi se</button>
                         <Link to="/register">Registracija</Link>
                     </div>
                </form>
            </div>
            {/* <Loading /> */}
        </div>
    )
}


