import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPage from './routes/NavPage';
import Login from './routes/Login';
import Page404 from './routes/Page404';
import Chat from './routes/Chat';
import Signup from './routes/Signup';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavPage />} >
          <Route path='/' element={<Chat />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;