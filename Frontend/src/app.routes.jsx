import Login from "./pages/Login";
import Register from "./pages/Register";

import  { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <div>Home Page</div>
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    }
])