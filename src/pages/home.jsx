/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered.');
        } else {
          setErrorMessage(errorMessage);
        }
        console.log(errorCode, errorMessage);
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  if (user) {
    return <Navigate to="/private"></Navigate>;
  }

  return (
    <section>
      <h2>Homepage</h2>
      <form>
        <legend>Sign Up</legend>
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleEmailChange} />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </li>
          </ul>

          <button type="button" onClick={handleSignUp} disabled={isButtonDisabled}>
            Sign Up
          </button>
        </fieldset>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </section>
  );
};
