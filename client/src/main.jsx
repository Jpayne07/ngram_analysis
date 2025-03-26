import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import routes from './routes.jsx'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './AppContext.jsx'



const root = createRoot(document.getElementById('root'))
const router = createBrowserRouter(routes)
root.render(
    <AppProvider>
      <RouterProvider router = {router} />
    </AppProvider>

)
