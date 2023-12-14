import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Container, Navbar, NavbarBrand,
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
        <Navbar
          data-bs-theme="light"
          expand="lg"
          variant="white"
          className="shadow-sm z-1 sticky-top w-100"
        >
          <Container>
            <NavbarBrand as={Link} to={auth ? routes.chat : routes.login}>
              {t('nav.chatName')}
            </NavbarBrand>
            {auth && <Button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</Button>}
          </Container>
        </Navbar>
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
