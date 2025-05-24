// src/pages/WorkoutList.jsx
import React, { useEffect, useState } from "react";
import { getAllWorkouts, deleteWorkout } from "../services/workoutServices";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      toast.error("❌ Failed to delete workout.");
      console.error(err);
    }
  };

  if (loading)
    return <div className="text-center p-4">Loading workouts...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Workout Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <Link to={`/workouts/${workout._id}`}>
              <h2 className="text-xl font-semibold">{workout.title}</h2>
              <p className="text-gray-600 mt-2">{workout.description}</p>
            </Link>

            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => navigate(`/edit/${workout._id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleDelete(workout._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
