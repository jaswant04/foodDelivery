import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order.jsx';
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/authContext';
import { OrderProvider } from './context/orderContext';


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/orders", element: <Order /> }
    ]
  },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
