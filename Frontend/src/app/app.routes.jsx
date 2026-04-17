import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <><h1>Welcome to Vexa-Core</h1></>
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