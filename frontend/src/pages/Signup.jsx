import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

const Signup = () => {
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [signupStatus, setSignupStatus] = useState(null);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (res.ok) {
        // Successful signup
        setSignupStatus('success');
      } else {
        // Unsuccessful signup
        if (data.error === 'Email already registered') {
          setSignupStatus('emailExists');
        } else {
          setSignupStatus('failed');
        }
      }
    } catch (error) {
      console.log(error);
      setSignupStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      {signupStatus === 'success' && (
        <p className='text-green-500'>User added successfully!</p>
      )}
      {signupStatus === 'emailExists' && (
        <p className='text-red-500'>Email already exists. Please use a different email.</p>
      )}
      {signupStatus === 'failed' && (
        <p className='text-red-500'>Signup failed. Please try again later.</p>
      )}
      <div className='flex gap-4 m-4'>
        <p>Have an account? </p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
