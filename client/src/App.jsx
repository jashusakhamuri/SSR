import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('adminToken');
  });

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('navigate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.navigateTo = navigate;

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setAdminAuthenticated(false);
    navigate('/');
  };

  const renderRoute = () => {
    if (currentPath === '/admin') {
      return adminAuthenticated ? (
        <AdminDashboard navigate={navigate} onLogout={handleLogout} />
      ) : (
        <AdminLogin onSuccess={() => setAdminAuthenticated(true)} />
      );
    }

    if (currentPath === '/products') {
      return <ProductsPage navigate={navigate} />;
    }

    if (currentPath === '/cart') {
      return <CartPage navigate={navigate} />;
    }

    return <Home navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-800 selection:text-white">
      {renderRoute()}
    </div>
  );
}

export default App;
