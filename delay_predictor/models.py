from django.db import models


class Prediction(models.Model):

    WEATHER_CHOICES = [
        ("Clear", "Clear"),
        ("Cloudy", "Cloudy"),
        ("Rain", "Rain"),
        ("Fog", "Fog"),
    ]

    CONGESTION_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]

    DAYS = [
        ("Monday", "Monday"),
        ("Tuesday", "Tuesday"),
        ("Wednesday", "Wednesday"),
        ("Thursday", "Thursday"),
        ("Friday", "Friday"),
        ("Saturday", "Saturday"),
        ("Sunday", "Sunday"),
    ]

    train_no = models.IntegerField()

    weather = models.CharField(
        max_length=20,
        choices=WEATHER_CHOICES
    )

    day_of_week = models.CharField(
        max_length=20,
        choices=DAYS
    )

    distance_from_source = models.IntegerField()

    previous_station_delay = models.IntegerField()

    track_congestion = models.CharField(
        max_length=20,
        choices=CONGESTION_CHOICES
    )

    station_congestion = models.CharField(
        max_length=20,
        choices=CONGESTION_CHOICES
    )

    predicted_delay = models.FloatField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Train {self.train_no}"