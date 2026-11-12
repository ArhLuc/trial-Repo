import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(BASE_DIR / "ml" / "railway_delay_model.pkl")
encoders = joblib.load(BASE_DIR / "ml" / "label_encoders.pkl")


def predict_delay(data):

    input_data = pd.DataFrame([{
        "train_no": data["train_no"],
        "weather": data["weather"],
        "day_of_week": data["day_of_week"],
        "distance_from_source": data["distance_from_source"],
        "previous_station_delay": data["previous_station_delay"],
        "track_congestion": data["track_congestion"],
        "station_congestion": data["station_congestion"],
    }])

    for column in [
        "weather",
        "day_of_week",
        "track_congestion",
        "station_congestion"
    ]:
        input_data[column] = encoders[column].transform(input_data[column])

    prediction = float(model.predict(input_data)[0])

    reasons = []

    if data["previous_station_delay"] >= 15:
        reasons.append("Previous station delay is high")

    if data["track_congestion"] == "High":
        reasons.append("Heavy track congestion")

    if data["station_congestion"] == "High":
        reasons.append("Station congestion is high")

    if data["weather"] in ["Rain", "Fog"]:
        reasons.append(f"Weather conditions: {data['weather']}")

    if not reasons:
        reasons.append("Normal operating conditions")

    return round(prediction, 1), reasons