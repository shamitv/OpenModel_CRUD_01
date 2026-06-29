import { create } from 'zustand';
import { surveyApi } from '../services/surveyApi';

const initialState = {
  surveys: [],
  currentSurvey: null,
  isLoading: false,
};

export const useSurveyStore = create((set, get) => ({
  ...initialState,
  fetchSurveys: async () => {
    set({ isLoading: true });
    try {
      const response = await surveyApi.getMySurveys();
      set({ surveys: response.data.surveys || [], isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
  fetchSurvey: async (id) => {
    try {
      const response = await surveyApi.getSurvey(id);
      set({ currentSurvey: response.data });
    } catch (err) {
      throw err;
    }
  },
  createSurvey: async (title, description) => {
    try {
      const response = await surveyApi.createSurvey({ title, description });
      const surveys = get().surveys;
      set({ surveys: [...surveys, response.data], currentSurvey: response.data });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  updateSurvey: async (id, data) => {
    try {
      const response = await surveyApi.updateSurvey(id, data);
      const surveys = get().surveys.map((s) => (s.id === id ? response.data : s));
      set({ surveys, currentSurvey: response.data });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  deleteSurvey: async (id) => {
    try {
      await surveyApi.deleteSurvey(id);
      const surveys = get().surveys.filter((s) => s.id !== id);
      set({ surveys, currentSurvey: surveys.find((s) => s.id === id) || null });
    } catch (err) {
      throw err;
    }
  },
  setCurrentSurvey: (survey) => set({ currentSurvey: survey }),
  addQuestion: async (surveyId, questionData) => {
    try {
      const response = await surveyApi.addQuestion(surveyId, questionData);
      const current = get().currentSurvey;
      if (current) {
        const questions = [...(current.questions || []), response.data];
        set({ currentSurvey: { ...current, questions } });
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  reorderQuestions: async (surveyId, questionIds) => {
    try {
      const response = await surveyApi.reorderQuestions(surveyId, questionIds);
      const current = get().currentSurvey;
      if (current) {
        set({ currentSurvey: { ...current, questions: response.data.questions } });
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  moveQuestionUp: async (surveyId, questionId) => {
    try {
      const response = await surveyApi.moveQuestionUp(surveyId, questionId);
      const current = get().currentSurvey;
      if (current) {
        set({ currentSurvey: { ...current, questions: response.data.questions } });
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  moveQuestionDown: async (surveyId, questionId) => {
    try {
      const response = await surveyApi.moveQuestionDown(surveyId, questionId);
      const current = get().currentSurvey;
      if (current) {
        set({ currentSurvey: { ...current, questions: response.data.questions } });
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  deleteQuestion: async (surveyId, questionId) => {
    try {
      await surveyApi.deleteQuestion(surveyId, questionId);
      const current = get().currentSurvey;
      if (!current) return;
      const questions = current.questions.filter((q) => q.id !== questionId);
      set({ currentSurvey: { ...current, questions } });
    } catch (err) {
      throw err;
    }
  },
}));
