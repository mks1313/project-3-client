import "./App.css";
import "./pages/RestListPage.css";
// import "./components/Footer.css"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestListPage from "./pages/RestListPage";
import RestDetailPage from "./pages/RestDetailsPage";
// import SignupPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import EditRestPage from "./pages/EditRestPage";
import CreateRestPage from "./pages/CreateRestPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import IsPrivate from './components/IsPrivate';
import {Cloudinary} from "@cloudinary/url-gen";

const App = () => {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djetyayyd'
    }
  });
};


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestListPage />} />
          <Route path="/restaurants/:id" element={<RestDetailPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/restaurants/edit/:id" element={<IsPrivate><EditRestPage /></IsPrivate>} />
          <Route path="/create" element={<IsPrivate><CreateRestPage /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
          <Route path="/edit-profile" element={<IsPrivate><EditProfilePage /></IsPrivate>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
