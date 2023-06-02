import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
//Layout
import Layout from './Components/Layout'
//
//Pages
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import ErrorPage from './Components/ErrorPage'
import Editar, {loader as editarClienteLoader, action as actionEditar} from './pages/Editar'
//
import Index, { loader as clientesLoader } from './pages/Index'
import {action as actionEliminar} from "./Components/Clientes"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader : clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path:"/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path:"/clientes/:id/editar",
        element:<Editar />,
        loader: editarClienteLoader,
        action: actionEditar,
        errorElement: <ErrorPage />
      },
      {
        path:"/clientes/:id/eliminar",
        action: actionEliminar,
      }
    ]
  },
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
   <RouterProvider router={router} />
 // </React.StrictMode>,
)
