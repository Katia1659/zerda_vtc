import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UsersList from "./components/account/users/GetUsers";
import MultiStepsForms from "./pages/UserRegister";
import NavBar from "./assets/theme/navbare/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <h1 className="text-3xl font-bold ">Hello world!</h1>
      <Routes>
        <Route path="/register" element={<MultiStepsForms />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
