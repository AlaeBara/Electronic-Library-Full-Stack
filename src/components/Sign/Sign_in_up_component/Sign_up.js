import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import styles from '../Sign.module.css'; 

const SignUpForm = () => {
  return (
    
    <form action="#" className={styles['sign-up-form']}>
      <h2 className={styles.title}>Sign up</h2>
      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
        <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input type="text" placeholder="Username" />
      </div>
      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
        <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input type="email" placeholder="Email" />
      </div>
      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
        <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input type="password" placeholder="Password" />
      </div>
      <input type="submit" className={styles.btn} value="Sign up" />
      <p className={styles['social-text']}>Or Sign up with social platforms</p>
      <div className={styles['social-media']}>
        <a href="#" className={styles['social-icon']}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#" className={styles['social-icon']}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className={styles['social-icon']}>
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        <a href="#" className={styles['social-icon']}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
