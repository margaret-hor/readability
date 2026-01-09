import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from './Signup.module.scss';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

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
    if (!formData.username.trim() || formData.username.trim().length < 2) {
      newErrors.username = 'Name is required and should contain at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password || formData.password.trim().length < 6) {
      newErrors.password = 'Password is required and should contain at least 6 characters';
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm the password';
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await signup(formData.email, formData.password, formData.username);

      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          setServerError('This email is already registered');
          break;
        case 'auth/invalid-email':
          setServerError('Invalid email address');
          break;
        case 'auth/weak-password':
          setServerError('Password should be at least 6 characters');
          break;
        default:
          setServerError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.signupPage}>
      <h2 className={styles.title}>create account</h2>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            placeholder="John Doe"
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </div>
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
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm password *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            placeholder="123456"
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}