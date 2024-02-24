import "./App.css";
import "./pages/RestListPage.css"
import "./components/Footer.css"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestListPage from "./pages/RestListPage";
import RestDetailPage from "./pages/RestDetailsPage";
// import Footer from "./components/Footer"
// import SignupPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestListPage />} />
        <Route path="/restaurants/:id" element={<RestDetailPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
     
    </div>
  );
}

export default App;

