import axios from 'axios';

const API_BASE_URL = 'http://localhost:6030';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const surveyApi = {
  createSurvey(data) {
    return api.post('/api/surveys', data);
  },
  getMySurveys() {
    return api.get('/api/surveys/my');
  },
  getSurvey(id) {
    return api.get(`/api/surveys/${id}`);
  },
  updateSurvey(id, data) {
    return api.put(`/api/surveys/${id}`, data);
  },
  deleteSurvey(id) {
    return api.delete(`/api/surveys/${id}`);
  },
  addQuestion(surveyId, questionData) {
    return api.post(`/api/surveys/${surveyId}/questions`, questionData);
  },
  reorderQuestions(surveyId, questionIds) {
    return api.patch(`/api/surveys/${surveyId}/questions/reorder`, null, {
      params: { question_ids: questionIds },
    });
  },
  moveQuestionUp(surveyId, questionId) {
    return api.patch(`/api/surveys/${surveyId}/questions/${questionId}/move-up`);
  },
  moveQuestionDown(surveyId, questionId) {
    return api.patch(`/api/surveys/${surveyId}/questions/${questionId}/move-down`);
  },
  deleteQuestion(surveyId, questionId) {
    return api.delete(`/api/surveys/${surveyId}/questions/${questionId}`);
  },
};

export default api;
