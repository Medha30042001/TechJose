import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { signupUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../utils/appRoutes';
import { useDispatch } from 'react-redux';

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
    });

    const signupMutation = useMutation({
        mutationFn : signupUser,

        onSuccess : () => {
            alert("Signup successful. Please login");
            navigate(APP_ROUTES.LOGIN);
        },
        onError : (error) => {
            console.log(error.message);
        },
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();

        signupMutation.mutate(formData);
    }

  return (
    <>
        <div className=''>
            <div className=''>

                <h1 className=''>
                        Create Account
                </h1>
                <p className=''>
                    Signup here to register yourself as a user</p>

                <form onSubmit={handleSignup} className=''>

                    <input type="text"
                        name='name'
                        value={formData.name}
                        placeholder='Enter your name'
                        onChange={handleChange}
                        className=''
                        required />

                    <input type="email"
                        name='email'
                        value={formData.email}
                        placeholder='Enter your email'
                        onChange={handleChange}
                        className=''
                        required />

                    <input type="password"
                        name='password' 
                        value={formData.password}
                        placeholder='Enter your password'
                        onChange={handleChange}
                        className=''
                        required/>

                    <button type='submit'
                        disabled={signupMutation.isPending}
                        className=''
                        >
                            {signupMutation.isPending? "Creating account..." : "Signup"}
                    </button>
                </form>

                {signupMutation.isError && (
                    <p className=''>{signupMutation.error.message}</p>
                )}

                <p className=''>
                    Already logged in? 
                </p>
                <Link to={APP_ROUTES.LOGIN}
                    className=''>
                    Login
                </Link>
            </div>
            
        </div>
    </>
  )
}

export default Signup