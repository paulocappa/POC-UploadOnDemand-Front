import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/Login';

import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <LoginPage />
    <GlobalStyle />
  </React.StrictMode>,
);
