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
        fields = ['username', 'display_name', 'bio', 'school', 'profile_pic', 'coin_balance']

class UserSettingsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', required=False)
    username = serializers.CharField(source='user.username', read_only=True)

    display_name = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    school = serializers.CharField(required=False, allow_blank=True)
    profile_pic = serializers.URLField(required=False, allow_blank=True)
    
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'display_name', 'bio', 'school', 'profile_pic', 'new_password']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        if 'email' in user_data:
            user.email = user_data['email']
            user.save()

        instance.display_name = validated_data.get('display_name', instance.display_name)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.school = validated_data.get('school', instance.school)
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.save()

        new_password = validated_data.get('new_password')
        if new_password:
            user.set_password(new_password)
            user.save()
        return instance