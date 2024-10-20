import { Outlet } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar/>
      <main className="py-3 flex justify-center items-center ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
