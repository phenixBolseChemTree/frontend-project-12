import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Container, Nav, NavbarBrand,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import routes from '../routes';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(routes.login);
  };

  return (
    <div>
      <header>
        <Nav
          className="shadow-sm navbar navbar-expand-lg navbar-light bg-white z-1"
          style={{
            position: 'fixed',
            width: '100%',
          }}
        >
          <Container>
            <NavbarBrand as={Link} to={auth ? routes.chat : routes.login}>
              {t('nav.chatName')}
            </NavbarBrand>
            {auth && <Button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</Button>}
          </Container>
        </Nav>
      </header>
      <main style={{
        paddingTop: 50,
        height: '100%',
      }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
