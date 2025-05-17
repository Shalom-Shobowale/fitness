import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Classes from "./pages/Classes";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";
import AdminDashboard from "./pages/AdminDashboard";
import { CreateProvider } from "./Context/CreateContext";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import WorkoutDetail from "./components/WorkoutDetails.jsx"
import AddWorkout from "./components/AddWorkout.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Watch for login changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);
  return (
    <CreateProvider>
      <Router>
        {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/adminDashboard"
                element={
                  localStorage.getItem("isAdmin") === "true" ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/userProfile"
                element={<Profile setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/workouts/:id" element={<WorkoutDetail />} />
              <Route path="/addworkout" element={<AddWorkout />} />
              {/* Catch unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
            <BookingForm />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/userLogin"
              element={
                <UserLogin
                  setIsAuthenticated={setIsAuthenticated}
                  setIsAdmin={(val) =>
                    localStorage.setItem("isAdmin", val.toString())
                  }
                />
              }
            />
            <Route path="*" element={<Navigate to="/userLogin" />} />
          </Routes>
        )}
      </Router>
    </CreateProvider>
  );
}
