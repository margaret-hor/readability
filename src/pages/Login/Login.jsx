import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from './Login.module.scss';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const message = location.state?.message;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  const validateForm = () => {
    setServerError('');
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password || formData.password.trim().length < 6) {
      newErrors.password = 'Password is required and should contain at least 6 characters';
    }

    return newErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setServerError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setServerError('Too many attempts. Try again later');
          break;
        default:
          setServerError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <h2 className={styles.title}>login</h2>

      {message && <div className={styles.message}>{message}</div>}
      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="example@mail.com"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            placeholder="123456"
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging...' : 'Log in'}
        </button>
      </form>

      {/* <p className={styles.forgotPassword}>
        <Link to="/forgot-password">Forgot password?</Link>
      </p> */}

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}