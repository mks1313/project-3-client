import "./App.css";
import "./pages/RestListPage.css";
// import "./components/Footer.css"
// import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestListPage from "./pages/RestListPage";
import RestDetailPage from "./pages/RestDetailsPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EditRestPage from "./pages/EditRestPage";
import CreateRestPage from "./pages/CreateRestPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import IsPrivate from './components/IsPrivate';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestListPage />} />
        <Route path="/restaurants/:id" element={<RestDetailPage />} />
        <Route path="/signup" element={<SignupPage />} /> */
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurants/edit/:id" element={<IsPrivate><EditRestPage /></IsPrivate>} />
        <Route path="/create" element={<CreateRestPage />} />
        <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/edit-profile" element={<IsPrivate><EditProfilePage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
