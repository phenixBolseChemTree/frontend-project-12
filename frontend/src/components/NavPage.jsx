import React from 'react';
import {
  Outlet, Link, useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const NavPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const auth = useAuth();
  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav
        className="shadow-sm navbar navbar-expand-lg navbar-light bg-white z-1"
        style={{
          position: 'fixed',
          width: '100%',
        }}
      >
        <div className="container">
          <Link to={user ? '/' : '/login'} className="navbar-brand">{t('nav.chatName')}</Link>
          {user && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</button>}
        </div>
      </nav>
      <div style={{
        paddingTop: 50,
        height: '100%',
      }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default NavPage;
