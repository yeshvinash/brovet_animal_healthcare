import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import AuthShell from '../../components/auth/AuthShell';
import { Input, Alert } from '../../components/UI/Shared';
import { Button } from '../../components/UI/Button';
import { Icons } from '../../components/UI/Icons';

const PasswordField = ({ id, label, value, onChange, placeholder = '••••••••', required = true }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        label={label}
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={id.includes('confirm') ? 'new-password' : id.includes('signup') || id.includes('new') ? 'new-password' : 'current-password'}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-[2.35rem] p-1 rounded-md text-neutral-muted hover:text-primary hover:bg-neutral-light transition"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const UserLogin = () => {
  const { user, loginUser } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const res = loginUser(email, password);
      setLoading(false);
      if (res.success) navigate('/');
      else setError(res.message);
    }, 600);
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-neutral-muted">
        Redirecting...
      </div>
    );
  }

  return (
    <AuthShell
      variant="user"
      title="Sign in to your account"
      subtitle="Access your Brovet customer portal for quotations and dealer updates."
      footer={
        <p>
          New to Brovet?{' '}
          <a href="/signup" className="font-bold text-primary hover:underline">Create an account</a>
        </p>
      }
    >
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          id="user_login_email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <PasswordField
          id="user_login_password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-neutral-muted cursor-pointer select-none">
            <input type="checkbox" className="rounded border-neutral-border text-primary focus:ring-primary" />
            Remember me
          </label>
          <span className="text-neutral-muted">Need help? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a></span>
        </div>

        <Button variant="primary" type="submit" className="w-full py-2.5 font-bold" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="pt-2 border-t border-neutral-light text-center text-xs text-neutral-muted">
        Staff member?{' '}
        <a href="/admin/login" className="font-semibold text-primary hover:underline">Admin login</a>
      </div>
    </AuthShell>
  );
};

export default UserLogin;
