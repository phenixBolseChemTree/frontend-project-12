import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { AuthProvider } from './components/AuthContext';
import { NavPage, Chat, Login, Signup, Page404 } from './routes/pages';

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
        <AuthProvider>
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
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;