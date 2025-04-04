# quiz/urls.py
from django.urls import path
from .views import QuizListAPIView, GenerateQuizAPIView

urlpatterns = [
    path('questions/', QuizListAPIView.as_view(), name='quiz-list'),
    path('generate/', GenerateQuizAPIView.as_view(), name='generate-quiz'),
]
