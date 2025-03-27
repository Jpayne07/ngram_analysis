import React from "react";
import App from './App.jsx'
import Home from './Pages/Home.jsx'

const routes = [
    {
        path: '/tools/nGram',
        element: <App />,

        children: [
            {
                path:"/tools/nGram",
                element: <Home />,
              }
        ]
    },
]
export default routes