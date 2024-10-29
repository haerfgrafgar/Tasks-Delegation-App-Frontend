import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import ExecTasksPage from "../Pages/ExecTasksPage";
import CreateWorkPage from "../Pages/CreateWorkPage";
import ListUsers from "../Pages/ListUsers";
import WatchUserTasksPage from "../Pages/WatchUserTasksPage";
import UserHistoryPage from "../Pages/UserHistoryPage";
import ValidateWorkPage from "../Pages/ValidateWorkPage";
import CoordTasksPage from "../Pages/CoordTasksPage";
//import CalendarPage from "../Pages/CalendarPage";
import UserCalendarPage from "../Pages/UserCalendarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <ExecTasksPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/validate",
        element: (
          <ProtectedRoutes>
            <ValidateWorkPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/coord",
        element: (
          <ProtectedRoutes>
            <CoordTasksPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoutes>
            <CreateWorkPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoutes>
            <ListUsers />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/calendar",
      //   element: (
      //     <ProtectedRoutes>
      //       <CalendarPage />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/tasks/:username",
        element: (
          <ProtectedRoutes>
            <WatchUserTasksPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/historico/:username",
        element: (
          <ProtectedRoutes>
            <UserHistoryPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/calendar/:username",
        element: (
          <ProtectedRoutes>
            <UserCalendarPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
