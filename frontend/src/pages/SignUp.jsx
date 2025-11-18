import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import '../styles/Auth.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/'); // Redirect to home page after sign up
    } catch (err) {
      setError('Failed to create an account. The email may already be in use.', err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignUp} className="auth-form">
        <h2>Sign Up</h2>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}