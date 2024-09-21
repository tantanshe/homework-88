import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import theme from './theme';
import {persistor, store} from './app/store';
import {ThemeProvider} from '@mui/material';
import {PersistGate} from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
