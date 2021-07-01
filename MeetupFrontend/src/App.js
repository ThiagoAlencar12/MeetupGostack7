import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/Reactotronconfig';

import Routes from './routes';
import history from './services/history';

import { store, persistir } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistir}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={2000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
