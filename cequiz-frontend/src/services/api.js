import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const generateQuiz = async (category) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/`, { category });
    return response.data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};
