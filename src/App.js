import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import AppRouter from './AppRouter';
import AuthContainer from './containers/AuthContainer';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <HashRouter>
      <AuthContainer>
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </AuthContainer>
    </HashRouter>
  );
}

export default App;
