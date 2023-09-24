import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Components/AuthContext';



const NavPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      login();
    } else {
      // тут будет редирект на login
    }
  }, [login]);


  const handleLogout = () => {
    logout()

    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" style={{
        position: 'fixed',
        width: '100%',
      }}>
        <div className="container">
          <Link to="/" className="navbar-brand">{t('nav.chatName')}</Link>
          {/* <Link to="/login" className="navbar-brand">Login</Link>
          <Link to="/signup" className="navbar-brand">Signup</Link> */}
          {isLoggedIn && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('nav.logOut')}</button>}

        </div>
      </nav>
      <div style={{
        paddingTop: 50,
        height: '100%'
      }}>
        <Outlet />
      </div>
    </>
  )
}

export default NavPage;
