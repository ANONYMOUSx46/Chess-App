import React, { useState } from "react";
import { auth } from "../firebase"; // Import  Firebase setup
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/game");
    } catch (error) {
      alert("Sign-in failed. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/game");
    } catch (error) {
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Sign In / Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 border rounded w-full max-w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 border rounded w-full max-w-xs"
      />
      <div className="flex gap-4">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
