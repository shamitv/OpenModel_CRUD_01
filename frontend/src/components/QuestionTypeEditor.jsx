import { useSurveyStore } from '../store/surveyStore';

export default function QuestionTypeEditor({ question }) {
  const questionTypeLabels = {
    multiple_choice: 'Multiple Choice',
    short_text: 'Short Text',
    long_text: 'Long Text',
    rating: 'Rating',
  };

  if (question.question_type === 'multiple_choice') {
    const options = question.options ? JSON.parse(question.options) : [];

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Options ({options.length}/10)</span>
        </div>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-5">{idx + 1}.</span>
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                useSurveyStore.getState().addQuestion(question.survey_id, {
                  ...question,
                  options: newOptions,
                });
              }}
              className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newOptions = [...options, ''];
            useSurveyStore.getState().addQuestion(question.survey_id, {
              ...question,
              options: newOptions,
            });
          }}
          disabled={options.length >= 10}
          className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          + Add option
        </button>
      </div>
    );
  }

  if (question.question_type === 'rating') {
    return (
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500">Min value</label>
          <input
            type="number"
            min={1}
            max={5}
            value={question.min || 1}
            onChange={(e) => {
              useSurveyStore.getState().addQuestion(question.survey_id, {
                ...question,
                min: parseInt(e.target.value) || 1,
              });
            }}
            className="w-16 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Max value</label>
          <input
            type="number"
            min={1}
            max={5}
            value={question.max || 5}
            onChange={(e) => {
              useSurveyStore.getState().addQuestion(question.survey_id, {
                ...question,
                max: parseInt(e.target.value) || 5,
              });
            }}
            className="w-16 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    );
  }

  return null;
}
