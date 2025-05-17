import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById, logWorkout } from "../services/workoutServices";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogWorkout = async () => {
    try {
      await logWorkout(id); // should succeed now
      alert("✅ Workout logged successfully!");
    } catch (err) {
      console.error("❌ Error logging workout:", err);
      alert("Failed to log workout.");
    }
  };

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("No valid workout ID provided.");
      setLoading(false);
      return;
    }

    const fetchWorkout = async () => {
      try {
        const data = await getWorkoutById(id);
        if (!data || data.message === "Workout not found") {
          setError("Workout not found.");
        } else {
          setWorkout(data);
        }
      } catch (err) {
        console.error("❌ Error fetching workout:", err);
        setError(err.message || "Failed to load workout.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading workout...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 p-4">
        {error}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {workout.title || workout.name}
      </h1>
      <p className="text-gray-700 mb-4">{workout.description}</p>

      <h2 className="text-xl font-semibold mb-2">Exercises:</h2>
      {workout.exercises && workout.exercises.length > 0 ? (
        <ul className="list-disc pl-5">
          {workout.exercises.map((ex, idx) => (
            <li key={idx} className="mb-2">
              <strong>{ex.name}</strong>: {ex.sets} sets × {ex.reps} reps
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No exercises listed.</p>
      )}

      {/* ✅ Mark as Completed button */}
      <button
        className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        onClick={handleLogWorkout}
      >
        ✅ Mark as Completed
      </button>
    </div>
  );
};

export default WorkoutDetail;
