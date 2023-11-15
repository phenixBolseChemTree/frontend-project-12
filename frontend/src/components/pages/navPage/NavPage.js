import React, { useContext, useEffect } from 'react';
import {
  Outlet, Link, useNavigate, useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../AuthContext';

const NavPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoggedIn, logout, login, token,
  } = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      login();
    }
  }, [login, navigate, location, token, isLoggedIn]);

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
          <Link to={token ? '/' : '/login'} className="navbar-brand">{t('nav.chatName')}</Link>
          {token && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</button>}
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
