import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import AuthShell from '../../components/auth/AuthShell';
import { Input, Alert } from '../../components/UI/Shared';
import { Button } from '../../components/UI/Button';
import { Icons } from '../../components/UI/Icons';

const PasswordField = ({ id, label, value, onChange }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        label={label}
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        required
        autoComplete="current-password"
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

const AdminLogin = () => {
  const { admin, loginAdmin } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) navigate('/admin/dashboard');
  }, [admin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const res = loginAdmin(email, password);
      setLoading(false);
      if (res.success) navigate('/admin/dashboard');
      else setError(res.message);
    }, 800);
  };

  if (admin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-neutral-muted">
        Redirecting to dashboard...
      </div>
    );
  }

  return (
    <AuthShell
      variant="admin"
      title="Admin portal login"
      subtitle="Authenticate to manage products, blogs, dealers, and RFQ requests."
      footer={
        <p>
          Need a staff account?{' '}
          <a href="/admin/signup" className="font-bold text-primary hover:underline">Register admin</a>
          {' · '}
          <a href="/login" className="font-semibold text-neutral-body hover:text-primary hover:underline">Customer login</a>
        </p>
      }
    >
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Official admin email"
          id="admin_login_email"
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <PasswordField
          id="admin_login_password"
          label="Security password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="primary" type="submit" className="w-full py-2.5 font-bold" disabled={loading}>
          {loading ? 'Authenticating session...' : 'Sign In to Dashboard'}
        </Button>
      </form>

      <p className="text-center text-3xs text-neutral-muted pt-1 border-t border-neutral-light">
        Authorized personnel only. Demo authentication is client-side only.
      </p>
    </AuthShell>
  );
};

export default AdminLogin;
