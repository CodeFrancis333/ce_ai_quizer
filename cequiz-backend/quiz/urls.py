from django.urls import path
from .views import QuizListAPIView, GenerateQuizAPIView, UserProfileAPIView

urlpatterns = [
    path('questions/', QuizListAPIView.as_view(), name='quiz-list'),
    path('generate/', GenerateQuizAPIView.as_view(), name='generate-quiz'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
]
