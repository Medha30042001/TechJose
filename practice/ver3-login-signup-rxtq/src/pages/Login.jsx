import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { loginUser } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../utils/appRoutes'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '../store/slices/authSlice'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email : "",
        password : "",
    })

    const loginMutation = useMutation({
        mutationFn : loginUser,

        onSuccess : (data) => {
            //alert("Login Successful. Go to dashboard");
            dispatch(setLoggedInUser(data));
            navigate(APP_ROUTES.DASHBOARD);

        },

        onError : (error) => {
            console.log(error.message);            
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        loginMutation.mutate(formData);
    }

  return (
    <>
        <div>
            <div>

                <h1>Login here</h1>

                <p>Login to view the dashboard</p>

                <form onSubmit={handleLogin} 
                    className=''>
                        
                        <input type="email"
                        name='email'
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        className=''
                        required />

                        <input type="password"
                        name='password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        className=''
                        required />

                        <button type='submit'
                            disabled={loginMutation.isPending}
                            className=''>
                            {loginMutation.isPending ? "Logging in" : "Login"}
                        </button>
                </form>

                {loginMutation.isError && (
                    <p className=''>
                        {loginMutation.error.message}</p>
                )}

                <div className=''>
                    <p className=''>Test credentials : </p>
                    <p>email : test@gmail.com</p>
                    <p>password : 123456</p>
                </div>

                <p className=''>
                    Haven&apos;t registered yet?{" "} </p>
                <Link to={APP_ROUTES.SIGNUP}
                className=''>
                    Signup</Link>
            </div>
        </div>
    </>
  )
}

export default Login