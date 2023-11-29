import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header>
        <nav
          className="shadow-sm navbar navbar-expand-lg navbar-light bg-white z-1"
          style={{
            position: 'fixed',
            width: '100%',
          }}
        >
          <div className="container">
            <Link to={auth ? '/' : '/login'} className="navbar-brand">{t('nav.chatName')}</Link>
            {auth && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</button>}
          </div>
        </nav>
      </header>
      <main style={{
        paddingTop: 50,
        height: '100%',
      }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
