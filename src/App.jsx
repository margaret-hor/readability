import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to='/login' replace />;
  }
  return children;
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/*public routes*/}
      <Route
        path='/login'
        element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
      />
      {/*protected routes*/}
      <Route
        path="/dashboard"
        element={
          currentUser ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      {/*root route*/}
      <Route
        path="/"
        element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
      />
      {/*any else*/}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;