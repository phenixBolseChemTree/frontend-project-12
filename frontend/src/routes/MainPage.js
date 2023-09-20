import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';


const MainPage = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
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
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
          <Link to="/login" className="navbar-brand">Login</Link>
          <Link to="/signup" className="navbar-brand">Signup</Link>
          {/* {btnOut && <button type="button" onClick={handleLogout} className="btn btn-primary">Выйти</button>} */}
          <button type="button" onClick={handleLogout} className="btn btn-primary">Выйти 2</button>
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

export default MainPage;
