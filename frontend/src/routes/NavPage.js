import React, { useContext, useEffect } from 'react';
import {
  Outlet, Link, useNavigate, useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../сomponents/AuthContext';

const NavPage = () => {
  console.log('!nav!');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token || location.pathname !== '/') {
      login();
    } else {
      navigate('/login');
    }
  }, [login, navigate, location]);

  const handleLogout = () => {
    logout();

    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <nav
        className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
        style={{
          position: 'fixed',
          width: '100%',
        }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">{t('nav.chatName')}</Link>
          {isLoggedIn && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</button>}

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
