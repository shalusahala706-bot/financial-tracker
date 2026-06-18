import { createBrowserRouter } from "react-router";
import Tracker from "../pages/Tracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tracker/>,
  }
]);
export default router;