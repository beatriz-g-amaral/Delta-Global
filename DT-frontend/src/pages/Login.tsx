import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLogin } from '../hooks/use-login';
import './Login.css';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="logo-circle">
          <span className="logo-text">LOGO</span>
        </div>
      </div>

      <div className="login-content">
        <div className="login-form-wrapper">
          <h1 className="login-title">
            Seja bem-vindo
          </h1>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

          <div className="login-form-group">
            <Input
              placeholder="Digite seu e-mail"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-button-wrapper">
            <Button
              className="custom-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Logar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
