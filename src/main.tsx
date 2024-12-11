import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Approutes.tsx'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
