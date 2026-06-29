import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSurveyStore } from '../store/surveyStore';

export default function SurveyPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSurvey, currentSurvey } = useSurveyStore();
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const survey = await fetchSurvey(id);
        setAnswers({});
        setErrors({});
      } catch (err) {
        console.error('Failed to load survey:', err);
      }
    };
    load();
  }, [id, fetchSurvey]);

  const questions = currentSurvey?.questions || [];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  };

  const validate = () => {
    const newErrors = {};
    let hasErrors = false;
    questions.forEach((q) => {
      if (q.required) {
        const val = answers[q.id];
        if (val === undefined || val === null || val === '') {
          newErrors[q.id] = 'This question is required';
          hasErrors = true;
        } else if (q.question_type === 'multiple_choice' && !val) {
          newErrors[q.id] = 'Please select an option';
          hasErrors = true;
        }
      }
    });
    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    // In Phase 3, we don't actually submit - just show success
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const questionTypeLabels = {
    multiple_choice: 'Select an option',
    short_text: 'Enter your answer',
    long_text: 'Enter your answer',
    rating: 'Rate this',
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h1>
          <p className="text-gray-500 mb-6">Your response has been recorded.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to surveys
          </button>
        </div>
      </div>
    );
  }

  if (!currentSurvey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentSurvey.title}</h1>
        {currentSurvey.description && (
          <p className="text-gray-500 mb-8">{currentSurvey.description}</p>
        )}

        {/* Progress indicator for surveys with >3 questions */}
        {questions.length > 3 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Progress</span>
              <span>
                {questions.findIndex((q) => q.id === Object.keys(answers).length > 0 ? Object.keys(answers)[0] : null)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(questions.length, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((question, idx) => (
            <div key={question.id} className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {idx + 1}. {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h2>

              {/* Multiple Choice */}
              {question.question_type === 'multiple_choice' && (
                <div className="space-y-2">
                  {question.options?.map((opt, oidx) => (
                    <label key={oidx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={opt}
                        checked={answers[question.id] === opt}
                        onChange={() => handleAnswer(question.id, opt)}
                        className="text-blue-600 focus:ring-blue-300"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Rating */}
              {question.question_type === 'rating' && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleAnswer(question.id, val)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-colors ${
                        answers[question.id] === val
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}

              {/* Short Text */}
              {question.question_type === 'short_text' && (
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors[question.id]
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-200 focus:ring-blue-200'
                  }`}
                  placeholder="Your answer"
                />
              )}

              {/* Long Text */}
              {question.question_type === 'long_text' && (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none ${
                    errors[question.id]
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-200 focus:ring-blue-200'
                  }`}
                  placeholder="Your answer"
                  rows={4}
                />
              )}

              {errors[question.id] && (
                <p className="text-sm text-red-600 mt-1">{errors[question.id]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
