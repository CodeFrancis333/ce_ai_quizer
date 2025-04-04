# quiz/views.py
import openai
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import QuizQuestion
from .serializers import QuizQuestionSerializer

# Make sure to set your OpenAI API key in settings or as an environment variable
openai.api_key = 'YOUR_OPENAI_API_KEY'

class GenerateQuizAPIView(APIView):
    """
    POST endpoint to generate a quiz for a given category.
    Expects JSON: { "category": "Reinforced Concrete Design" }
    """

    def post(self, request, *args, **kwargs):
        category = request.data.get("category")
        if not category:
            return Response({"error": "Category is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Example prompt for AI: Adjust the prompt as needed
        prompt = (
            f"Generate 10 multiple choice questions for the category {category} in Civil Engineering. "
            "Return 5 easy definition questions, 3 medium problem solving questions, and 2 high difficulty "
            "complicated questions. For each question, provide 4 options (A, B, C, D), indicate the correct "
            "option, and include a brief explanation. Format each question as follows:\n\n"
            "Question: <question text>\n"
            "A: <option text>\n"
            "B: <option text>\n"
            "C: <option text>\n"
            "D: <option text>\n"
            "Correct: <A/B/C/D>\n"
            "Explanation: <explanation>\n\n"
        )

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
