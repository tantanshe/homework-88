import { createRoot } from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import theme from './theme';
import {store} from './app/store';
import {ThemeProvider} from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
