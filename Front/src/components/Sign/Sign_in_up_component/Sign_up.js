import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../Sign.module.css';
import axios from 'axios';
import { User , LockKeyhole , Mail} from 'lucide-react';

const SignUpForm = ({onSignUpSuccess}) => {
  const [formData, setFormData] = useState({
    username: '',
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
          <User  />
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
          <Mail />
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
          <LockKeyhole />
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