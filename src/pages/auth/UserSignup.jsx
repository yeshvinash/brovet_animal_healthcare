import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import AuthShell from '../../components/auth/AuthShell';
import { Input, Button, Alert } from '../../components/UI/Shared';
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
        className="absolute right-3 top-[2.35rem] p-1 rounded-md text-neutral-muted hover:text-primary hover:bg-neutral-light transition"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const UserSignup = () => {
  const { user, signupUser } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

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
      const res = signupUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        password: form.password,
      });
      setLoading(false);
      if (res.success) navigate('/');
      else setError(res.message);
    }, 700);
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
      badge="Create account"
      title="Create your Brovet account"
      subtitle="Register as a dealer, distributor, or farm buyer to request quotes faster."
      footer={
        <p>
          Already have an account?{' '}
          <a href="/login" className="font-bold text-primary hover:underline">Sign in</a>
        </p>
      }
    >
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          id="user_signup_name"
          placeholder="Your full name"
          value={form.name}
          onChange={update('name')}
          required
          autoComplete="name"
        />
        <Input
          label="Email address"
          id="user_signup_email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={update('email')}
          required
          autoComplete="email"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone"
            id="user_signup_phone"
            type="tel"
            placeholder="Optional"
            value={form.phone}
            onChange={update('phone')}
            autoComplete="tel"
          />
          <Input
            label="Company / Farm"
            id="user_signup_company"
            placeholder="Optional"
            value={form.company}
            onChange={update('company')}
            autoComplete="organization"
          />
        </div>
        <PasswordField
          id="user_signup_password"
          label="Password"
          value={form.password}
          onChange={update('password')}
        />
        <PasswordField
          id="user_signup_confirm"
          label="Confirm password"
          value={form.confirm}
          onChange={update('confirm')}
        />

        <label className="flex items-start gap-2 text-xs text-neutral-muted cursor-pointer select-none">
          <input type="checkbox" required className="mt-0.5 rounded border-neutral-border text-primary focus:ring-primary" />
          <span>
            I agree to the{' '}
            <a href="/terms-conditions" className="text-primary font-semibold hover:underline">Terms</a>
            {' '}and{' '}
            <a href="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <Button variant="primary" type="submit" className="w-full py-2.5 font-bold" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </AuthShell>
  );
};

export default UserSignup;
