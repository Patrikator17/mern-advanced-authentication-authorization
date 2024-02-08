import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">About</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Backend (Node.js with Express and MongoDB):</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Backend setup using Express framework.</li>
          <li>MongoDB used as the database, connected via Mongoose.</li>
          <li>Routes for user authentication (signup, login, Google OAuth), user CRUD operations (update, delete), and signout.</li>
          <li>Controllers to handle user authentication logic (signup, login, Google OAuth), and user CRUD operations (update, delete).</li>
          <li>Middleware for verifying JWT token sent in cookies.</li>
          <li>Password hashing using bcryptjs.</li>
          <li>JSON Web Tokens (JWT) used for user authentication and authorization.</li>
          <li>Error handling middleware to catch and return appropriate error responses.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Frontend (React with Redux and Firebase):</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Frontend setup using React with React Router for routing.</li>
          <li>Redux used for state management, with actions and reducers for user authentication, updating, and deleting user profiles.</li>
          <li>Firebase authentication used for Google OAuth.</li>
          <li>Components for signup, login, profile, and OAuth integration.</li>
          <li>PrivateRoute component to restrict access to authenticated users.</li>
          <li>Handling file uploads with Firebase Storage.</li>
          <li>User interface components using Tailwind CSS for styling.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Authentication and Authorization:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>User authentication implemented using JWT tokens.</li>
          <li>Passwords hashed before storing in the database.</li>
          <li>Middleware to verify JWT tokens and restrict access to certain routes.</li>
          <li>Google OAuth authentication using Firebase.</li>
          <li>User authentication status managed in Redux store.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">User Profile Management:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>CRUD operations for user profiles (update, delete).</li>
          <li>Updating user profile information and profile picture.</li>
          <li>Deleting user accounts.</li>
          <li>Error handling for profile updates and account deletion.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Error Handling:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Handling various types of errors in both backend and frontend.</li>
          <li>Returning appropriate error responses to the client.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Data Persistence:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>MongoDB used for storing user data.</li>
          <li>Redux Persist used for persisting Redux state across sessions.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Frontend UI:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>UI components designed using Tailwind CSS.</li>
          <li>Forms for signup, login, and profile update.</li>
          <li>Buttons for actions like sign up, login, update, delete, and sign out.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
