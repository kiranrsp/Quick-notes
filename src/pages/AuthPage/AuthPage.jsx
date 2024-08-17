import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LogInForm/LogInForm';
import { useState } from 'react';
import React from "react";
 import Button from 'react-bootstrap/Button';

function AuthPage({setUser}) {
  const [showSignUp, setShowSignUp] = useState(false);

    return (
     <div>
       <h1>Welcome to Notes Managemet App</h1>

       
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
     {showSignUp ? 'Already an existing user ?' : 'Create a new account with us !'}       <Button variant="primary"onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</Button>
     </div>
);
}

export default AuthPage;