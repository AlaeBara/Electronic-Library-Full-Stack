import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../Sign.module.css';
import axios from 'axios';

const SignUpForm = ({onSignUpSuccess}) => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    address: '',
    country: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData,{ withCredentials: true });
      setMessage(response.data.message);
      onSignUpSuccess();
      setFormData({
        username: '',
        phone: '',
        address: '',
        country: '',
        email: '',
        password: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['sign-up-form']}>
      <h2 className={styles.title}>Sign up</h2>
      
     

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="text" 
          name="username" 
          placeholder="Name" 
          required 
          onChange={handleChange}
          value={formData.username}
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone" 
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}" 
          required 
          onChange={handleChange}
          value={formData.phone}
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          required
          onChange={handleChange}
          value={formData.address}
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="text" 
          name="country" 
          placeholder="Country" 
          required
          onChange={handleChange}
          value={formData.country}
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          onChange={handleChange}
          value={formData.email}
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      {message && <div className={styles.message}>{message}</div>}

      <input type="submit" className={styles.btn} value="Sign up" />
    </form>
  );
};

export default SignUpForm;