import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import MainPage from './Components/MainPage';
import Login from './Components/Login';
import Page404 from './Components/Page404';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;