import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import routes from './routes.jsx'
import './index.css'
import { AppProvider } from './AppContext.jsx'
import Nav from './components/Nav'



const root = createRoot(document.getElementById('root'))
const router = createBrowserRouter(routes,{
  basename: "/ngram_analysis",
})
root.render(
    <AppProvider>
      <Nav />
      <RouterProvider router = {router}/>
    </AppProvider>

)
