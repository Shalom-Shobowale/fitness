import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "https://fitness-3wke.onrender.com/api/admin/login"
      : "https://fitness-3wke.onrender.com/api/admin/register";

    const payload = isLogin
      ? { username, password }
      : { username, password, role };

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
        localStorage.setItem("isAdmin", true);
        alert("Login successful!");
        window.location.href = "/admin";
      } else {
        alert("Registration successful! You can now login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Admin Login" : "Register Admin"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Show role select ONLY for register */}
        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="manager">Manager</option>
          </select>
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
