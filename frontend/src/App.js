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
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

const REACT_APP_ROLLBAR_ACCESS_TOKEN = process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN
const REACT_APP_ENV = process.env.REACT_APP_ENV


const rollbarConfig = {
  accessToken: REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: REACT_APP_ENV,
};

const App = () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Provider>
  );
}

export default App;