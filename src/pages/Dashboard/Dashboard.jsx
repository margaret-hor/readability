import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Welcome back, {currentUser?.displayName}! 👋</h1>
      <p>Your study dashboard</p>
    </div>
  );
}