import { useState } from "react";
import WorkoutList from "./WorkoutList";

export default function AddWorkout() {
  // Define state variables for form inputs
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "" },
  ]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorkout = {
      title: workoutName,
      description: workoutDescription,
      exercises: exercises,
    };

    try {
      const token = localStorage.getItem("token"); // Make sure the token is stored here after login

      const res = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWorkout),
      });

      if (res.ok) {
        alert("Workout added successfully!");
        setWorkoutName("");
        setWorkoutDescription("");
        setExercises([{ name: "", sets: "", reps: "" }]);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add workout");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding workout: " + error.message);
    }
  };

  // Handle change in the exercises form
  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const newExercises = [...exercises];
    newExercises[index][name] = value;
    setExercises(newExercises);
  };

  // Handle adding new exercise
  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
  };

  // Handle removing an exercise
  const handleRemoveExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add a New Workout</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="workoutName"
              className="block text-sm font-medium text-gray-700"
            >
              Workout Name
            </label>
            <input
              type="text"
              id="workoutName"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="workoutDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Workout Description
            </label>
            <textarea
              id="workoutDescription"
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Exercises
            </label>
            {exercises.map((exercise, index) => (
              <div key={index} className="mb-4 flex space-x-4">
                <input
                  type="text"
                  name="name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="Exercise Name"
                  className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  name="sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="Sets"
                  className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  name="reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="Reps"
                  className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExercise}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Exercise
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md"
            >
              Add Workout
            </button>
          </div>
        </form>
      </div>

      <WorkoutList />
    </>
  );
}
