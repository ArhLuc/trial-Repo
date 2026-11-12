const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

export async function predictDelay(form) {
  const estimatedDistance =
    form.boarding_station.toLowerCase() ===
    form.destination_station.toLowerCase()
      ? 50
      : 650;

  const payload = {
    train_no: 12301,
    weather: form.weather,
    day_of_week: form.day_of_week,
    distance_from_source: estimatedDistance,
    previous_station_delay: 0,
    track_congestion:
      form.weather === "Rain" || form.weather === "Fog" ? "High" : "Medium",
    station_congestion:
      form.day_of_week === "Saturday" || form.day_of_week === "Sunday"
        ? "High"
        : "Medium",
  };

  const response = await fetch(`${API_BASE_URL}/predict/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Request failed (${response.status}): ${JSON.stringify(data)}`,
    );
  }

  return data;
}