import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PublicRoutes from "routes";
import GlobalSpinner from "components/spinner/GlobalSpinner";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app min-h-[100vh]">
          <PublicRoutes />
          <GlobalSpinner />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
