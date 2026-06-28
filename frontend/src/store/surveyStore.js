import { create } from 'zustand';

const initialState = {
  surveys: [],
  currentSurvey: null,
  isLoading: false,
};

export const useSurveyStore = create((set, get) => ({
  ...initialState,
  fetchSurveys: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6030/api/surveys/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await response.json();
    if (response.ok) {
      set({ surveys: data, isLoading: false });
    } else {
      set({ isLoading: false });
      throw new Error(data.detail || 'Failed to fetch surveys');
    }
  },
  fetchSurvey: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6030/api/surveys/' + id, {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await response.json();
    if (response.ok) {
      set({ currentSurvey: data });
    } else {
      throw new Error(data.detail || 'Failed to fetch survey');
    }
  },
  createSurvey: async (title, description) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6030/api/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    if (response.ok) {
      const surveys = get().surveys;
      set({ surveys: [...surveys, data], currentSurvey: data });
    } else {
      throw new Error(data.detail || 'Failed to create survey');
    }
  },
  updateSurvey: async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6030/api/surveys/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    });
    const surveyData = await response.json();
    if (response.ok) {
      const surveys = get().surveys.map((s) => (s.id === id ? surveyData : s));
      set({ surveys, currentSurvey: surveyData });
    } else {
      throw new Error(surveyData.detail || 'Failed to update survey');
    }
  },
  deleteSurvey: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6030/api/surveys/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    if (response.ok) {
      const surveys = get().surveys.filter((s) => s.id !== id);
      set({ surveys: surveys, currentSurvey: surveys.find((s) => s.id === id) || null });
    } else {
      throw new Error('Failed to delete survey');
    }
  },
  setCurrentSurvey: (survey) => set({ currentSurvey: survey }),
}));
