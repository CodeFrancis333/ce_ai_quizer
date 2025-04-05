import openai
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import QuizQuestion
from .serializers import QuizQuestionSerializer
from rest_framework import generics, permissions
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import UserSettingsSerializer


# Uncomment and set your actual API key when available
# openai.api_key = 'YOUR_OPENAI_API_KEY'

class GenerateQuizAPIView(APIView):
    """
    POST endpoint to generate a quiz for a given category.
    Expects JSON: { "category": "Reinforced Concrete Design" }
    """
    def post(self, request, *args, **kwargs):
        category = request.data.get("category")
        if not category:
            return Response({"error": "Category is required."}, status=status.HTTP_400_BAD_REQUEST)

        # For testing, use dummy generated text instead of calling OpenAI
        generated_text = (
            "Question: What is the derivative of x^2?\n"
            "A: 2x\n"
            "B: x\n"
            "C: 2\n"
            "D: x^2\n"
            "Correct: A\n"
            "Explanation: The derivative of x^2 is 2x.\n\n"
            "Question: What is the integral of 2x?\n"
            "A: x^2\n"
            "B: 2x\n"
            "C: x\n"
            "D: 2\n"
            "Correct: A\n"
            "Explanation: The integral of 2x is x^2 plus a constant.\n\n"
        )

        # Uncomment this block to use the OpenAI API once you have a valid API key.
        """
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",  # or another model as appropriate
                prompt=prompt,
                max_tokens=1200,
                temperature=0.7,
                n=1,
                stop=None,
            )
            generated_text = response.choices[0].text.strip()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        """

        # Parse the generated text to extract questions
        question_pattern = re.compile(
            r"Question:\s*(?P<question>.*?)\n"
            r"A:\s*(?P<option_a>.*?)\n"
            r"B:\s*(?P<option_b>.*?)\n"
            r"C:\s*(?P<option_c>.*?)\n"
            r"D:\s*(?P<option_d>.*?)\n"
            r"Correct:\s*(?P<correct>[ABCD])\n"
            r"Explanation:\s*(?P<explanation>.*?)\n(?:\n|$)",
            re.DOTALL
        )
        matches = question_pattern.finditer(generated_text)
        created_questions = []
        for match in matches:
            data = match.groupdict()
            question_instance = QuizQuestion.objects.create(
                category=category,
                question=data["question"].strip(),
                option_a=data["option_a"].strip(),
                option_b=data["option_b"].strip(),
                option_c=data["option_c"].strip(),
                option_d=data["option_d"].strip(),
                correct_answer=data["correct"].strip(),
                solution=data["explanation"].strip(),
                image_url="",  # You can optionally set this if the prompt includes image info
            )
            created_questions.append(question_instance)
        
        serializer = QuizQuestionSerializer(created_questions, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QuizListAPIView(generics.ListAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user.profile

# Registration endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=status.HTTP_201_CREATED)

# Login endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)


class UserSettingsAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class ChangePasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not current_password or not new_password or not confirm_password:
            return Response({"error": "All password fields are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect."},
                            status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "New passwords do not match."},
                            status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)