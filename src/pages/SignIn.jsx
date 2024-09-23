/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import the useNavigate hook

  // State to manage email, password, and error message
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState(false);

  // Dummy sign-in function
  const handleSignIn = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      // Simulate successful sign-in
      dispatch(setIsAuthenticated(true));
      // Reset fields
      setEmail("");
      setPassword("");
      setError("");
      // Navigate to the dashboard after successful sign-in
      navigate("/dashboard");
    } else {
      // Set error message
      setError("Invalid email or password.");
    }
  };

  // Styles
  const divStyle =
    "flex flex-col justify-center h-full w-full max-w-md p-6  rounded-lg ";
  const inputStyle = (hasError) =>
    `h-12 w-full text-base text-gray-700 bg-white outline-none pl-3 rounded border-2 w-full ${
      hasError ? "border-red-600" : "border-gray-300"
    }`;
  const labelStyle = "mb-1 text-lg text-blue-900 md:text-gray-400 font-nunito";
  const errorStyle = "mt-1 text-sm text-red-600";

  return (
    <div
      id="modalParent "
      className="flex  w-full flex-col justify-center items-center mx-auto px-5"
    >
      <p className="mb-6 mt-2 font-nunito text-lg text-blue-900 md:text-gray-400 px-2">
        Welcome Back, Sign in to your Schooly account
      </p>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center w-full"
      >
        <div className={divStyle}>
          <label className={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle(error)}
          />
        </div>
        <div className={divStyle}>
          <label className={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyle(error)}
          />
        </div>
        {error && <p className={errorStyle}>{error}</p>}
        <button
          type="submit"
          className="mt-4 h-12 bg-blue-800 text-white rounded hover:bg-blue-900 w-[60%]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
