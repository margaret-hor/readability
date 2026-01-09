import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/dashboard">StudyFlow</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/aiassistant">AI Assistant</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
      </ul>

      <div className={styles.userSEction}>
        <span>{currentUser?.displayName || currentUser?.email}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}