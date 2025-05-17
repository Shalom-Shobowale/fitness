import { useContext, useState } from "react";
import { CreateContext } from "../Context/CreateContext";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    className: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // 💬 status feedback
  const { showForm, setShowForm } = useContext(CreateContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("https://fitness-3wke.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "✅ Booking submitted!" });
        setFormData({ name: "", email: "", className: "" });
        setTimeout(() => {
          setShowForm(false);
          setMessage(null);
        }, 1500);
      } else {
        const data = await res.json();
        setMessage({
          type: "error",
          text: data.message || "❌ Something went wrong!",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Network error!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <div className="bg-secondary top-0 flex items-center justify-center h-full w-full absolute z-10 bg-opacity-25 backdrop-blur-sm">
          <p
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            ❌
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md p-6 bg-white shadow-md rounded-xl space-y-4 relative"
          >
            <h2 className="text-2xl font-bold text-center">Book a Class</h2>

            <label className="block">
              <span className="text-sm">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm">Class Name</span>
              <input
                type="text"
                name="className"
                placeholder="e.g. Yoga, Pilates"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                required
              />
            </label>

            {message && (
              <p
                className={`text-sm text-center ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
              } text-white py-2 rounded-md`}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
