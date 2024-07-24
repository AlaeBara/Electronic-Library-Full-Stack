import React, { useState } from 'react';
import styles from './Sign.module.css'; 
import SignInForm from './Sign_in_up_component/Sign_in';
import SignUpForm from './Sign_in_up_component/Sign_up';
import dda from './casino-background_2x-removebg-preview.png';


const AuthContainer = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <SignInForm />
          <SignUpForm onSignUpSuccess={handleSignInClick} />
        </div>
      </div>
      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']}`}>
          <div className={styles.content}>
            <h3>New to our ebook library?</h3>
            <p>
              Discover a world of knowledge and entertainment with our extensive collection of ebooks. Join us today and start your reading journey!
            </p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={dda} className={styles.image} alt="Reading" />

        </div>
        <div className={`${styles.panel} ${styles['right-panel']}`}>
          <div className={styles.content}>
            <h3>Already a member?</h3>
            <p>
              Welcome back! Sign in to continue exploring our collection and enjoy personalized recommendations based on your reading history.
            </p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={dda} className={styles.image} alt="Reading" />

          
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;