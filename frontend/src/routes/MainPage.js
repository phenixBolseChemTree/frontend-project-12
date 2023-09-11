import React from 'react';
import { Outlet, Link } from 'react-router-dom';


const MainPage = () => (
  <>
    {/* <nav> 
        <ul>
        <li>
          <Link to="/login">Page Login</Link>
        </li> 
        <li>
          <Link to="/qweqweqwqweqweqeq">404 test</Link>
        </li>
        <li>
          <Link to="/">Chat</Link>
        </li>
      </ul> */}
    <nav class="shadow-sm navbar navbar-expand-lg navbar-light bg-white" style={{
      position: 'fixed',
      width: '100%',
    }}>
      <div class="container"><a class="navbar-brand" href="/">Vanin Chat</a>
        <button type="button" class="btn btn-primary">Выйти</button>
        <a class="navbar-brand" href="/">Chat</a>
        <a class="navbar-brand" href="/login">Login</a>
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

export default MainPage;
