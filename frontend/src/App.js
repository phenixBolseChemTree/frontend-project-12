import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Components/MainPage';
import Login from './Components/Login';
import Page404 from './Components/Page404';
import Chat from './Components/Chat';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
        <Route path='/' element={<Chat />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;