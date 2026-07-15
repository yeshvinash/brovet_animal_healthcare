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
        placeholder="At least 6 characters"
        value={value}
        onChange={onChange}
        required
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-[2.35rem] p-1 rounded-md text-neutral-body hover:text-primary hover:bg-neutral-light transition"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const AdminSignup = () => {
  const { admin, signupAdmin } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) navigate('/admin/dashboard');
  }, [admin, navigate]);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = signupAdmin({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      if (res.success) navigate('/admin/dashboard');
      else setError(res.message);
    }, 700);
  };

  if (admin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-neutral-body">
        Redirecting to dashboard...
      </div>
    );
  }

  return (
    <AuthShell
      variant="admin"
      badge="Staff registration"
      title="Create admin account"
      subtitle="Register a Brovet staff login for dashboard access. Demo only — not production-safe."
      footer={
        <p>
          Already have admin access?{' '}
          <a href="/admin/login" className="font-bold text-primary hover:underline">Sign in</a>
        </p>
      }
    >
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          id="admin_signup_name"
          placeholder="Staff full name"
          value={form.name}
          onChange={update('name')}
          required
          autoComplete="name"
        />
        <Input
          label="Work email"
          id="admin_signup_email"
          type="email"
          placeholder="name@brovet.com"
          value={form.email}
          onChange={update('email')}
          required
          autoComplete="email"
        />
        <PasswordField
          id="admin_signup_password"
          label="Password"
          value={form.password}
          onChange={update('password')}
        />
        <PasswordField
          id="admin_signup_confirm"
          label="Confirm password"
          value={form.confirm}
          onChange={update('confirm')}
        />

        <div className="rounded-xl border border-accent/40 bg-accent-light px-3 py-2.5 text-xs leading-relaxed text-neutral-dark">
          <strong className="text-accent-hover">Note:</strong> New admin accounts are stored locally in this browser for demo purposes.
        </div>

        <Button variant="primary" type="submit" className="w-full py-2.5 font-bold" disabled={loading}>
          {loading ? 'Creating admin account...' : 'Create Admin Account'}
        </Button>
      </form>
    </AuthShell>
  );
};

export default AdminSignup;
