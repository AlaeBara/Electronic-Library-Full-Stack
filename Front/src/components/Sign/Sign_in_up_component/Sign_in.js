import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../Sign.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../AuthContext';
import { User , LockKeyhole} from 'lucide-react';

const SignInForm = () => {
  const { checkAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData, { withCredentials: true });
      setMessage(response.data.message);
      await checkAuthStatus(); // Re-check auth status after login
      // Navigate based on the user role
      if (response.data.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during sign-in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['sign-in-form']}>
      <h2 className={styles.title}>Sign in</h2>
      
      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <User/>
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
          <LockKeyhole/>
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

      <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
    </form>
  );
};

export default SignInForm;