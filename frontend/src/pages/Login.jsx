import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from '../components/OAuth';

const Login = () => {
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); // Pass the user data to signInSuccess
        setLoginStatus("success");
        navigate("/");
      } else {
        dispatch(signInFailure("Invalid credentials")); // Pass an error message
        setLoginStatus("invalidCredentials");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("Login failed. Please try again later."));
      setLoginStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          className={`bg-slate-800 text-white rounded-md p-2 uppercase hover:opacity-95 disabled:opacity-80`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'LOGIN'}
        </button>
        <OAuth />
      </form>
      {loginStatus === 'success' && (
        <p className='text-green-500'>Login successful!</p>
      )}
      {loginStatus === 'invalidCredentials' && (
        <p className='text-red-500'>Invalid email or password. Please try again.</p>
      )}
      {loginStatus === 'failed' && (
        <p className='text-red-500'>Login failed. Please try again later.</p>
      )}
      <div className='flex gap-4 m-4'>
        <p>Don't have an account? </p>
        <Link to='/signup'>
          <span className='text-blue-500'>Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
