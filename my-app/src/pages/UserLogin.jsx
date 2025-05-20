import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function UserLogin({ setIsAuthenticated, setIsAdmin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    goal: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "https://fitness-3wke.onrender.com/api/users/login"
      : "https://fitness-3wke.onrender.com/api/users/register";

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        const isAdmin = data.user?.role === "admin";
        localStorage.setItem("isAdmin", isAdmin.toString());
        setIsAdmin(isAdmin);
        setIsAuthenticated(true);
        alert("Login successful!");
        setTimeout(() => navigate("/"), 100);
      } else {
        alert("Registration successful! You can now login.");
        setIsLogin(true);
      }
    } catch {
      alert("Error connecting to server. Please make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-sky-100 to-blue-200">
      <div className="flex flex-col lg:flex-row w-full h-[93.3vh]">
        <div className="hidden lg:block w-1/2 bg-[url('/bg-image.png')] bg-cover bg-center" />

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
            <h2 className="text-3xl font-semibold text-center text-secondary mb-6">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <input
                    type="text"
                    name="goal"
                    placeholder="Your Fitness Goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="weight"
                      placeholder="Weight (kg)"
                      value={formData.weight}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                    <input
                      type="number"
                      name="height"
                      placeholder="Height (cm)"
                      value={formData.height}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-accent transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-center text-sm text-secondary hover:underline cursor-pointer"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </p>
          </div>
        </div>
      </div>

      <footer className="text-sm text-white bg-gray-900 py-4 text-center">
        © 2025 FitBody. All rights reserved. — Made with 💖 @ FitBody
      </footer>
    </div>
  );
}


