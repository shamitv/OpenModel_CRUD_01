import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSurveyStore } from '../store/surveyStore';
import SurveyBuilderHeader from '../components/SurveyBuilderHeader';
import QuestionCard from '../components/QuestionCard';
import QuestionTypeEditor from '../components/QuestionTypeEditor';
import QuestionActions from '../components/QuestionActions';
import SaveStateIndicator from '../components/SaveStateIndicator';

export default function SurveyBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSurvey, setCurrentSurvey, fetchSurvey, createSurvey } = useSurveyStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState('short_text');

  // Load existing survey or create new one
  useEffect(() => {
    if (id) {
      const loadSurvey = async () => {
        try {
          await fetchSurvey(id);
        } catch (err) {
          console.error('Failed to load survey:', err);
        }
      };
      loadSurvey();
    }
  }, [id, fetchSurvey]);

  // Auto-save logic
  useEffect(() => {
    if (currentSurvey && isUnsaved) {
      setIsSaving(true);
      const saveTimer = setTimeout(async () => {
        try {
          if (currentSurvey.title || currentSurvey.description) {
            await useSurveyStore.getState().updateSurvey(currentSurvey.id, {
              title: currentSurvey.title,
              description: currentSurvey.description,
            });
            setIsUnsaved(false);
          }
        } catch (err) {
          console.error('Auto-save failed:', err);
        } finally {
          setIsSaving(false);
        }
      }, 2000);
      return () => clearTimeout(saveTimer);
    }
  }, [currentSurvey, isUnsaved]);

  const handleCreateNew = async () => {
    try {
      const survey = await createSurvey('Untitled Survey', '');
      navigate(`/builder/${survey.id}`);
    } catch (err) {
      console.error('Failed to create survey:', err);
    }
  };

  const handleAddQuestion = async () => {
    if (!currentSurvey) return;
    try {
      const questionData = {
        text: '',
        question_type: newQuestionType,
        required: false,
        options: newQuestionType === 'multiple_choice' ? [''] : undefined,
        min: newQuestionType === 'rating' ? 1 : undefined,
        max: newQuestionType === 'rating' ? 5 : undefined,
      };
      await useSurveyStore.getState().addQuestion(currentSurvey.id, questionData);
      setShowAddQuestion(false);
    } catch (err) {
      console.error('Failed to add question:', err);
    }
  };

  const handleDuplicate = (question) => {
    const newQuestion = {
      ...question,
      text: `${question.text} (Copy)`,
      position: (question.position || 0) + 1,
      id: null,
    };
    useSurveyStore.getState().addQuestion(question.survey_id, newQuestion);
  };

  const handleDelete = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      useSurveyStore.getState().deleteQuestion(currentSurvey.id, questionId);
    }
  };

  const handleMoveUp = (questionId) => {
    useSurveyStore.getState().moveQuestionUp(currentSurvey.id, questionId);
  };

  const handleMoveDown = (questionId) => {
    useSurveyStore.getState().moveQuestionDown(currentSurvey.id, questionId);
  };

  const handlePreview = () => {
    if (currentSurvey) {
      navigate(`/preview/${currentSurvey.id}`);
    }
  };

  if (!currentSurvey) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SurveyBuilderHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Question Outline */}
        <div className="w-64 border-r border-gray-200 overflow-y-auto p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase">Questions</h3>
            <span className="text-xs text-gray-400">{(currentSurvey.questions || []).length}</span>
          </div>
          {(currentSurvey.questions || []).map((question, idx) => (
            <div key={question.id} className="mb-2">
              <QuestionCard
                question={question}
                index={idx}
                isSelected={selectedQuestionId === question.id}
                onSelect={setSelectedQuestionId}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            </div>
          ))}
          <button
            onClick={() => setShowAddQuestion(!showAddQuestion)}
            className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-2"
          >
            + Add question
          </button>
          {showAddQuestion && (
            <div className="mt-2">
              <select
                value={newQuestionType}
                onChange={(e) => setNewQuestionType(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded px-2 py-1 mb-2"
              >
                <option value="short_text">Short Text</option>
                <option value="long_text">Long Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="rating">Rating</option>
              </select>
              <button
                onClick={handleAddQuestion}
                className="w-full text-sm text-blue-600 hover:text-blue-700"
              >
                Add Question
              </button>
            </div>
          )}
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {(currentSurvey.questions || []).map((question, idx) => (
              <div key={question.id} className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400">Q{idx + 1}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600 capitalize">
                      {question.question_type.replace('_', ' ')}
                    </span>
                  </div>
                  <QuestionActions question={question} index={idx} />
                </div>
                <QuestionTypeEditor question={question} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Settings Panel */}
        <div className="w-80 border-l border-gray-200 overflow-y-auto p-4 bg-gray-50">
          {selectedQuestionId && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4">Question Settings</h3>
              {(() => {
                const question = (currentSurvey.questions || []).find((q) => q.id === selectedQuestionId);
                if (!question) return null;
                return (
                  <div className="space-y-4">
                    <QuestionTypeEditor question={question} />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => {
                          useSurveyStore.getState().addQuestion(question.survey_id, {
                            ...question,
                            required: e.target.checked,
                          });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-300"
                      />
                      <span className="text-sm text-gray-600">Required</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
