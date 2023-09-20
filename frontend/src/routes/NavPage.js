import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../Redux/authSlice';


const NavPage = () => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.app.auth)

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setData(null))

    localStorage.clear();
    navigate('/login');
  }
  console.log('data!!!', data);

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" style={{
        position: 'fixed',
        width: '100%',
      }}>
        <div className="container">
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
          {/* <Link to="/login" className="navbar-brand">Login</Link>
          <Link to="/signup" className="navbar-brand">Signup</Link> */}
          {data && <button type="button" onClick={handleLogout} className="btn btn-primary">Выйти</button>}
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
