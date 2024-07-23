import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import Authentication from "./Auth/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Authentication /> }, // so on starting the application it will be the initial page 
      { path: "/posts", element: <Posts /> },
      { path: "/home", element: <Home /> }, 
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
