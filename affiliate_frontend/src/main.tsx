import { createRoot } from 'react-dom/client';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { store } from './store/storeRout';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './util/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </ErrorBoundary>,
);
