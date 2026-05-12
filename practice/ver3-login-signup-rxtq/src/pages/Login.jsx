import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { loginUser } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../utils/appRoutes'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '../store/slices/authSlice'
import { authStyles } from '../styles/authStyles'

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
            navigate(APP_ROUTES.DASHBOARD); //<Navigate to={} />

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

        loginMutation.mutate(formData); //loginUser(formData)
    }

  return (
    <>
        <div className={authStyles.pageWrapper}>
            <div className={authStyles.card}>

                <h1 className={authStyles.title}>Login here</h1>

                <p className={authStyles.subtitle}>Login to view the dashboard</p>

                <form onSubmit={handleLogin} 
                    className={authStyles.form}>
                        
                        <input type="email"
                        name='email'
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        className={authStyles.input}
                        required />

                        <input type="password"
                        name='password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        className={authStyles.input}
                        required />

                        <button type='submit'
                            disabled={loginMutation.isPending}
                            className={authStyles.primaryButton}>
                            {loginMutation.isPending ? "Logging in" : "Login"}
                        </button>
                </form>

                {loginMutation.isError && (
                    <p className={authStyles.error}>
                        {loginMutation.error.message}</p>
                )}

                <div className='bg-slate-100 rounded-lg p-4 mt-5 text-sm text-slate-600'>
                    <p className='font-semibold'>Test credentials : </p>
                    <p>email : test@gmail.com</p>
                    <p>password : 123456</p>
                </div>

                <p className={authStyles.linkText}>
                    Haven&apos;t registered yet?{" "} 
                    
                    <Link to={APP_ROUTES.SIGNUP}
                        className={authStyles.link}>
                        Signup</Link> 
                </p>
                
            </div>
        </div>
    </>
  )
}

export default Login