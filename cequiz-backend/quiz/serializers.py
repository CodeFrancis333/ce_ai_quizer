from rest_framework import serializers
from .models import QuizQuestion, UserProfile
from django.contrib.auth.models import User

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['username', 'coin_balance', 'profile_pic']