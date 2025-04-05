from django.urls import path
from .views import QuizListAPIView, GenerateQuizAPIView, register, login, UserSettingsAPIView , ChangePasswordAPIView

urlpatterns = [
    path('questions/', QuizListAPIView.as_view(), name='quiz-list'),
    path('generate/', GenerateQuizAPIView.as_view(), name='generate-quiz'),
    path('profile/', UserSettingsAPIView.as_view(), name='user-profile'),
    path('settings/', ChangePasswordAPIView.as_view(), name='user-settings'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
]
