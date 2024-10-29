import { Outlet, useLocation } from "react-router";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";

function App() {
  const location = useLocation();

  return (
    <>
      <UserProvider>
        {location.pathname !== "/login" && <Navbar />}
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
