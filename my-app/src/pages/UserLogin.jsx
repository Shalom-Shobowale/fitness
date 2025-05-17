import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

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
    isAdmin: false, // new field
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

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
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

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
        setIsAuthenticated(true); // triggers Navbar and routing update
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md md:w-[40%] w-[90%] space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "User Login" : "Sign Up"}
        </h2>

        {/* Common Fields */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        {/* Extra Fields Only for Register */}
        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="text"
              name="goal"
              placeholder="Goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="number"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-center text-sm text-blue-500 cursor-pointer mt-2"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "No account? Register" : "Have an account? Login"}
        </p>
      </form>
    </div>
  );
}
