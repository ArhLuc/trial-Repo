from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Prediction
from .serializers import PredictionSerializer
from .ml_predictor import predict_delay


@api_view(["GET"])
def test_api(request):
    return Response({"message": "API Working"})


@api_view(["POST"])
def predict(request):

    serializer = PredictionSerializer(data=request.data)

    if serializer.is_valid():

        delay, reasons = predict_delay(serializer.validated_data)

        prediction = serializer.save(
            predicted_delay=delay
        )

        return Response({
            "status": "success",
            "predicted_delay": delay,
            "reasons": reasons,
            "data": PredictionSerializer(prediction).data
        })

    return Response(serializer.errors, status=400)