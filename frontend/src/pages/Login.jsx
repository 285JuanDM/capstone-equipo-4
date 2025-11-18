import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../services/authService';
import '../styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError('Invalid email or password. Please try again.', err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Ingresa</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}