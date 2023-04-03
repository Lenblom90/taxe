import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./components/Calendar";
import ErrorPage from "./error-page";
import Habits from "./routes/habits";
import Journal from "./routes/journal";
import Root from "./routes/root";
import Settings from "./routes/settings";
import Tasks from "./routes/tasks";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/journal",
        element: <Journal />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/calendar",
        element: <div />,
      },
      {
        path: "/habits",
        element: <Habits />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
