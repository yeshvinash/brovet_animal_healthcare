import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_SESSION_KEY = 'brovet_admin_session';
const USER_SESSION_KEY = 'brovet_user_session';
const USERS_KEY = 'brovet_users';
const ADMINS_KEY = 'brovet_admins';

const DEFAULT_ADMIN = {
  id: 'admin-default',
  name: 'Brovet Admin',
  email: 'admin@brovet.com',
  password: 'admin123',
  role: 'SuperAdmin',
  createdAt: '2018-01-01T00:00:00.000Z',
};

const parseJson = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const readList = (key, fallback = []) => parseJson(localStorage.getItem(key), fallback);

const ensureDefaultAdmin = () => {
  const admins = readList(ADMINS_KEY, []);
  if (!admins.some((a) => a.email === DEFAULT_ADMIN.email)) {
    admins.push(DEFAULT_ADMIN);
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
  }
  return admins;
};

const toPublicAccount = (account) => {
  if (!account) return null;
  const { password, ...safe } = account;
  return safe;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureDefaultAdmin();

    const adminSession = parseJson(sessionStorage.getItem(ADMIN_SESSION_KEY), null);
    const userSession = parseJson(sessionStorage.getItem(USER_SESSION_KEY), null);

    if (adminSession?.email) setAdmin(adminSession);
    if (userSession?.email) setUser(userSession);
    setLoading(false);
  }, []);

  const loginAdmin = (email, password) => {
    const admins = ensureDefaultAdmin();
    const match = admins.find(
      (a) => a.email.toLowerCase() === String(email).trim().toLowerCase() && a.password === password
    );
    if (!match) {
      return { success: false, message: 'Invalid admin email or password' };
    }

    const session = {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role || 'Admin',
      loggedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    setAdmin(session);
    return { success: true };
  };

  const signupAdmin = ({ name, email, password }) => {
    const trimmedEmail = String(email).trim().toLowerCase();
    if (!name?.trim() || !trimmedEmail || !password) {
      return { success: false, message: 'Please fill in all required fields' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    const admins = ensureDefaultAdmin();
    if (admins.some((a) => a.email.toLowerCase() === trimmedEmail)) {
      return { success: false, message: 'An admin account with this email already exists' };
    }

    const account = {
      id: `admin-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password,
      role: 'Admin',
      createdAt: new Date().toISOString(),
    };
    admins.push(account);
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));

    return loginAdmin(trimmedEmail, password);
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdmin(null);
  };

  const loginUser = (email, password) => {
    const users = readList(USERS_KEY, []);
    const match = users.find(
      (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === password
    );
    if (!match) {
      return { success: false, message: 'Invalid email or password' };
    }

    const session = {
      id: match.id,
      name: match.name,
      email: match.email,
      company: match.company || '',
      phone: match.phone || '',
      role: 'Customer',
      loggedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const signupUser = ({ name, email, password, company, phone }) => {
    const trimmedEmail = String(email).trim().toLowerCase();
    if (!name?.trim() || !trimmedEmail || !password) {
      return { success: false, message: 'Please fill in all required fields' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    const users = readList(USERS_KEY, []);
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, message: 'An account with this email already exists' };
    }

    const account = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password,
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      createdAt: new Date().toISOString(),
    };
    users.push(account);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return loginUser(trimmedEmail, password);
  };

  const logoutUser = () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
    setUser(null);
  };

  // Backward-compatible aliases used by existing admin pages
  const login = loginAdmin;
  const logout = logoutAdmin;

  return (
    <AuthContext.Provider
      value={{
        admin,
        user,
        loading,
        login,
        logout,
        loginAdmin,
        signupAdmin,
        logoutAdmin,
        loginUser,
        signupUser,
        logoutUser,
        isAuthenticated: Boolean(user),
        isAdmin: Boolean(admin),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { toPublicAccount };
