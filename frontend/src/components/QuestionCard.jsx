import { useSurveyStore } from '../store/surveyStore';

export default function QuestionCard({ question, index, isSelected, onSelect, onDuplicate, onDelete, onMoveUp, onMoveDown }) {
  const questionTypeLabels = {
    multiple_choice: 'Multiple Choice',
    short_text: 'Short Text',
    long_text: 'Long Text',
    rating: 'Rating',
  };

  return (
    <div
      className={`p-4 border rounded-xl cursor-pointer transition-colors ${
        isSelected ? 'border-primary bg-primary-soft' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(question.id)}
    >
      <div className="flex items-start gap-2">
        <span className="text-gray-400 text-lg font-medium mt-1">☰</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Q{index + 1}
            </span>
            <select
              value={question.question_type}
              onChange={(e) => {
                const updated = { ...question, question_type: e.target.value };
                useSurveyStore.getState().addQuestion(question.survey_id, updated);
              }}
              className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_text">Short Text</option>
              <option value="long_text">Long Text</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <input
            type="text"
            value={question.text}
            onChange={(e) => {
              const updated = { ...question, text: e.target.value };
              useSurveyStore.getState().addQuestion(question.survey_id, updated);
            }}
            className="w-full text-sm border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none transition-colors pb-1 bg-transparent"
            placeholder="Enter question text..."
          />
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) => {
                  const updated = { ...question, required: e.target.checked };
                  useSurveyStore.getState().addQuestion(question.survey_id, updated);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-300"
              />
              Required
            </label>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMoveUp(question.id); }}
            disabled={index === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMoveDown(question.id); }}
            disabled={index === (useSurveyStore.getState().currentSurvey?.questions?.length || 0) - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate(question); }}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Duplicate"
          >
            ⧉
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(question.id); }}
            className="p-1 text-gray-400 hover:text-red-600"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
