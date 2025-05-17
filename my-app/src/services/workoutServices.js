const API_URL = "http://localhost:5000/api/workouts";

// Fetch all workout plans
export async function getAllWorkouts() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

// Fetch single workout by ID
export async function getWorkoutById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch workout");
  }
  return res.json();
}

export async function deleteWorkout(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete workout");
  }
  return res.json();
}

// ✅ New: Log a workout completion
export async function logWorkout(id) {
  const res = await fetch(`http://localhost:5000/api/workouts/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to log workout');
  }

  return res.json();
}

