import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/coin/:rank",
      element: <Detail />
    },
    {
      path: "about",
      element: (
        <div>
          <h1>Hello world</h1>
          <Link to="/about">About us</Link>
        </div>
      )
    }
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(<App />);

export default App;
