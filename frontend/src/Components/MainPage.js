import React from 'react';
import { Outlet, Link } from 'react-router-dom';


const MainPage = () => (
  <>
    <nav>
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
      </ul>
    </nav>
    <hr />
    <Outlet />
  </>
)

export default MainPage;
