import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Singup from "../pages/Singup/Singup";
import ServiceDetails from "../pages/Home/Services/ServiceDetails";
import Book from "../pages/Book/Book";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/singup',
          element: <Singup></Singup>
        },
        {
          path: '/service/:id',
          element: <ServiceDetails></ServiceDetails>,
          loader: ({params}) => fetch(`https://car-doctor-server-eight-dusky.vercel.app/services/${params.id}`)
        },
        {
          path: '/book/:id',
          element: <PrivateRoutes><Book></Book></PrivateRoutes>,
          loader: ({params}) => fetch(`https://car-doctor-server-eight-dusky.vercel.app/services/checkout/${params.id}`)
        },
        {
          path: '/bookings',
          element: <PrivateRoutes><Bookings></Bookings></PrivateRoutes>,
        }
      ]
    }
  ]);

  export default router;