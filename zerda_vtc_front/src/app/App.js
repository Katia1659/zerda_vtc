import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import UsersList from "./components/account/users/GetUsers";
// import MultiStepsForms from "./pages/UserRegister";
import NavBar from "../app/Layout/navbar/NavBar";
import Signup from "../app/pages/SigneUp";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <NavBar />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          className: "",
          duration: 5000,
          success: {
            style: {
              // background: "white",
              fontFamily: "nunito",
            },
          },
          error: {
            style: {
              // background: "white",
              fontFamily: "nunito",
            },
          },
        }}
      />
      <h1 className="text-3xl font-bold mb-9 text-center">Hello world!</h1>
      <div className="flex justify-center">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/users" element={<UsersList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
