import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "../components/Button";
import { IoMdDownload } from "react-icons/io";
import { ToastContainer, toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Secure admin check
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // 📥 Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://fitness-3wke.onrender.com/api/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setBookings(data);
      } catch {
        toast.error("Error fetching bookings. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // 🗑️ Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://fitness-3wke.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to delete booking.");
      }
    } catch {
      toast.error("Error deleting booking.");
    }
  };

  // 📤 Export CSV (filtered only)
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Class", "Date"];
    const rows = filtered.map((b) => [
      b.name || "N/A",
      b.email || "N/A",
      b.className || "N/A",
      new Date(b.createdAt).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔍 Filter
  const filtered = bookings.filter((b) =>
    `${b.name} ${b.email} ${b.className}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 📊 Stats
  const total = filtered.length;
  const classStats = filtered.reduce((acc, b) => {
    const className = b.className || "Unknown";
    acc[className] = (acc[className] || 0) + 1;
    return acc;
  }, {});
  const popularClass =
    Object.entries(classStats).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold">📋 Admin Dashboard</h2>
        <div className="flex gap-2">
          <Button
            name={
              <span className="flex items-center gap-2">
                Export CSV <IoMdDownload />
              </span>
            }
            px="px-6"
            onClick={exportToCSV}
          />
          <Button
            name="Logout"
            px="px-7"
            py="py-[15px]"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-xl font-bold">{total}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Most Popular Class</p>
              <p className="text-xl font-bold">{popularClass}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Class Counts</p>
              <ul className="text-sm mt-2">
                {Object.entries(classStats).map(([className, count]) => (
                  <li key={className}>
                    {className}: <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search bookings..."
            className="mb-6 w-full md:w-1/2 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Bookings */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((b) => (
                <div
                  key={b._id}
                  className="bg-white p-4 rounded-lg shadow relative border"
                >
                  <p>
                    <strong>Name:</strong> {b.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {b.email || "N/A"}
                  </p>
                  <p>
                    <strong>Class:</strong> {b.className || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Date:</strong>{" "}
                    {new Date(b.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
