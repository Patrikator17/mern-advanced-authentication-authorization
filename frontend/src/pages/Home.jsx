import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Authentication System</h1>
        <p className="text-lg text-gray-700">
          The project is a full-stack authentication system built using the MERN stack. It includes user registration, login with email or Google OAuth, profile management, and token-based authentication. Features include error handling, password hashing, and JWT implementation. The frontend utilizes React with Redux for state management and Tailwind CSS for styling.
        </p>
      </div>
    </div>
  );
};

export default Home;
