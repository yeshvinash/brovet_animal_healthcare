import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { Icons } from '../../components/UI/Icons';
import { Button } from '../../components/UI/Shared';
import {
  DashboardOverview,
  ProductsManager,
  CategoriesManager,
  BlogsManager,
  TestimonialsManager,
  MediaManager,
  InquiriesViewer,
  SettingsManager
} from './DashboardModules';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
    }
  }, [admin, navigate]);

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm font-semibold text-neutral-muted">Redirecting to login portal...</span>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icons.Building className="w-4 h-4" /> },
    { id: 'products', label: 'Manage Products', icon: <Icons.Layers className="w-4 h-4" /> },
    { id: 'categories', label: 'Manage Categories', icon: <Icons.Filter className="w-4 h-4" /> },
    { id: 'blogs', label: 'Manage Blogs', icon: <Icons.FileText className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Manage Testimonials', icon: <Icons.Star className="w-4 h-4" /> },
    { id: 'media', label: 'Gallery & Catalogues', icon: <Icons.Download className="w-4 h-4" /> },
    { id: 'dealers', label: 'Dealer Requests', icon: <Icons.User className="w-4 h-4" /> },
    { id: 'quotations', label: 'Quotation RFQs', icon: <Icons.Send className="w-4 h-4" /> },
    { id: 'messages', label: 'Contact Inbox', icon: <Icons.Mail className="w-4 h-4" /> },
    { id: 'settings', label: 'Site & SEO Settings', icon: <Icons.Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 pb-20">

      <aside className="lg:col-span-3 bg-white border border-neutral-border rounded-xl overflow-hidden shadow-premium">

        <div className="p-5 border-b bg-neutral-light flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div>
            <span className="block font-bold text-neutral-dark text-xs">{admin.email}</span>
            <span className="block text-3xs text-emerald-600 font-bold uppercase tracking-wider">Super Administrator</span>
          </div>
        </div>

        <nav className="p-3 space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white shadow-2xs font-bold'
                  : 'text-neutral-body hover:bg-neutral-light hover:text-primary'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t bg-slate-50/50">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 justify-start"
            icon={<Icons.X className="w-4 h-4" />}
          >
            Logout Session
          </Button>
        </div>
      </aside>

      <div className="lg:col-span-9 space-y-6">

        <div className="bg-white border p-5 rounded-xl shadow-premium flex items-center justify-between">
          <div>
            <span className="text-3xs uppercase tracking-widest text-primary font-bold">Workspace Portal</span>
            <h1 className="text-xl font-extrabold text-neutral-dark mt-0.5">
              {navItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>
          <span className="text-3xs text-neutral-muted font-bold uppercase tracking-wider">
            Brovet System Online
          </span>
        </div>

        <div className="fade-in">
          {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'categories' && <CategoriesManager />}
          {activeTab === 'blogs' && <BlogsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'media' && <MediaManager />}
          {activeTab === 'dealers' && <InquiriesViewer activeModule="dealers" />}
          {activeTab === 'quotations' && <InquiriesViewer activeModule="quotations" />}
          {activeTab === 'messages' && <InquiriesViewer activeModule="messages" />}
          {activeTab === 'settings' && <SettingsManager />}
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
