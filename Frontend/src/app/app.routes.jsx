import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Dashboard />
    </Protected>,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])  