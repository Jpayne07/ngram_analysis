import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import routes from './routes.jsx'
import './index.css'
import { AppProvider } from './AppContext.jsx'



const root = createRoot(document.getElementById('root'))
const router = createBrowserRouter(routes,{
  basename: "/ngram_analysis",
})
root.render(
    <AppProvider>
      <RouterProvider router = {router}/>
    </AppProvider>

)
