import ReactDOM from 'react-dom/client';
import './index.css';
import Init from './Init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await Init());
};

app();
