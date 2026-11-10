import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardPathForRole } from '../utils/roleRouting.js';
import { DEMO_PASSWORD, DEMO_USERS, FRONTEND_DEMO_MODE } from '../utils/demoAuth.js';

const DEMO_ACCOUNTS = DEMO_USERS.map((user) => ({
  label: user.role === 'eoc' ? 'EOC Control' : user.role === 'rescue_team' ? 'Rescue Team' : 'Citizen',
  email: user.email,
}));

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || dashboardPathForRole(user.role);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (email) => setForm({ email, password: DEMO_PASSWORD });

  return (
    <div className="flex min-h-screen items-center justify-center bg-field-bg px-4">
      <div className="w-full max-w-sm rounded-xl border border-black/5 bg-field-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-field-ink">Sign in to CrisisGrid</h1>
        <p className="mt-1 text-sm text-field-muted">Coordinate faster. Respond smarter.</p>
        {FRONTEND_DEMO_MODE && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
            Demo-only sign-in: credentials are checked in this browser, not by a server.
            Live data and backend actions are unavailable.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-field-muted">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-field-muted">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-severity-critical">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand py-2 text-sm font-medium text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 rounded-md border border-dashed border-gray-300 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-field-muted">Quick demo access</p>
          <p className="mt-1 text-xs text-field-muted">
            {FRONTEND_DEMO_MODE
              ? `Select a role to fill the demo credentials. Password: ${DEMO_PASSWORD}`
              : 'Run npm run seed in the backend once, then use a seeded demo account:'}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc.email)}
                className="rounded border border-gray-300 px-2 py-1 text-xs text-field-ink hover:border-brand hover:text-brand"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        {!FRONTEND_DEMO_MODE && (
          <p className="mt-6 text-center text-sm text-field-muted">
            No account?{' '}
            <Link to="/register" className="font-medium text-brand hover:underline">
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
