import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Usa createRoot en lugar de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
