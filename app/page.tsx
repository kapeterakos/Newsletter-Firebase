"use client";

import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsPopupVisible(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered.');
        } else {
          setErrorMessage(error.message);
        }
        console.log(errorCode, error.message);
      });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setEmail('');
    setPassword('');
    setIsButtonDisabled(true);
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');
  };

  if (!isMounted) return null;

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-dark-blue relative'>
      <header id="home" className="flex flex-col-reverse md:flex-row w-full h-screen max-w-7xl items-center justify-center p-8 relative overflow-x-hidden">
        <div className='w-full h-2/4 md:h-full md:w-2/5 flex flex-col justify-center items-center md:items-start gap-8'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-black text-white md:text-4xl'>Stay Hydrated, Stay Energized, Stay Sparked!</h1>
            <h2 className='text-md text-white md:text-2xl'>Ignite Your Performance with the Newest Sports drink!</h2>
          </div>
          <p className='max-w-md text-sm text-white md:text-base'>Sign up to our newsletter for the latest information</p>
          <div className='w-full flex items-center justify-center md:justify-start gap-4'>
            <form className="glassmorph p-8 rounded-lg shadow-lg w-full">
              <fieldset className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg font-medium text-white">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleEmailChange}
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-lg font-medium text-white">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handlePasswordChange}
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <button
                  type="button"
                  className={`w-full py-2 text-sm sm:text-base rounded transition-colors ${isButtonDisabled
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-neon-blue text-white hover:bg-neon-blue-hover'
                    }`}
                  onClick={handleSignUp}
                  disabled={isButtonDisabled}
                >
                  Sign Up
                </button>
              </fieldset>
              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </form>
          </div>
        </div>

        <div className="w-full h-2/4 md:h-full md:w-3/5 flex items-center justify-center relative mb-12 md:mb-0">
          <Spline
            scene="https://prod.spline.design/VTL2OZWq5IM5SYFm/scene.splinecode"
          />
        </div>
      </header>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-lg text-center">
            <p className="text-lg font-medium mb-4 text-blue-600">Sign up successful!</p>
            <button
              onClick={handleClosePopup}
              className="bg-neon-blue text-white px-4 py-2 rounded hover:bg-neon-blue-hover transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
