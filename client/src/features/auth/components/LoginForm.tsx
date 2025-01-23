import { AppDispatch } from '@/app/store';
import { useLoginMutation } from '../authApi';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAuth } from '../authSlice';



const role = "USER"

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch<AppDispatch>();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const data = await login({ email, password,role }).unwrap();
        dispatch(setAuth(data));
        alert('Login successful!');
      } catch (error: any) {
        alert(error?.data?.message || 'Login failed.');
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  };

export default LoginForm