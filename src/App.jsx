import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestListPage from "./pages/RestListPage";
// import SignupPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LogInPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/read" element={<RestListPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
