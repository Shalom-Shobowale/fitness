import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile({ setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔐 Token used in request:", token);

        if (!token) {
          console.warn("No token found, redirecting to login");
          navigate("/userlogin");
          return;
        }

        const res = await fetch("https://fitness-3wke.onrender.com/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Profile fetch failed:", data.message || data);
          navigate("/userlogin");
          return;
        }

        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        navigate("/userlogin");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/userlogin");
    localStorage.removeItem("token");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://fitness-3wke.onrender.com/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success("✅ Profile updated successfully!");
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Profile update error:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {isEditing ? "Edit Profile" : "My Profile"}
        </h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
            />
            <Input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <Input
              name="goal" // ✅ fixed from "goal"
              value={formData.goal || ""}
              onChange={handleChange}
            />
            <Input
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              type="number"
            />
            <Input
              name="height"
              value={formData.height || ""}
              onChange={handleChange}
              type="number"
            />
            <Input
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              type="number"
            />
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <ProfileItem label="Username" value={user.username} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Goals" value={user.goal} />
            <ProfileItem label="Weight" value={`${user.weight || 0} kg`} />
            <ProfileItem label="Height" value={`${user.height || 0} cm`} />
            <ProfileItem label="Age" value={`${user.age || 0} years`} />
            <ProfileItem label="Gender" value={user.gender} />
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function Input({ name, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
      required
    />
  );
}
