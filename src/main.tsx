
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes'; 
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { Toaster } from 'sonner';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
