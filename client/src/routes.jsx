import React from "react";
import App from './App.jsx'
import Home from './Pages/Home.jsx'

const routes = [
    {
        path: '/',
        element: <App />,

        children: [
            {
                path:"/",
                element: <Home />,
              }
        ]
    },
]
export default routes