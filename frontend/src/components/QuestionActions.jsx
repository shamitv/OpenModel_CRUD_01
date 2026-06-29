import { useSurveyStore } from '../store/surveyStore';

export default function QuestionActions({ question, index }) {
  const handleDuplicate = () => {
    const newQuestion = {
      ...question,
      text: `${question.text} (Copy)`,
      position: index + 1,
      id: null, // Will be assigned by server
    };
    useSurveyStore.getState().addQuestion(question.survey_id, newQuestion);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      useSurveyStore.getState().deleteQuestion(question.id);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleDuplicate()}
        className="text-gray-400 hover:text-gray-600 p-1 rounded"
        title="Duplicate question"
      >
        ⧉
      </button>
      <button
        onClick={() => handleDelete()}
        className="text-gray-400 hover:text-red-600 p-1 rounded"
        title="Delete question"
      >
        ✕
      </button>
    </div>
  );
}
