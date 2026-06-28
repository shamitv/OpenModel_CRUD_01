import { useEffect } from 'react';
import { useSurveyStore } from '../store/surveyStore';

function DashboardPage() {
  const { surveys, isLoading, fetchSurveys } = useSurveyStore();

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-body-md">Loading surveys...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-title-lg font-semibold mb-6">My Surveys</h2>
      {surveys.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-body-md mb-4">No surveys yet.</p>
          <p className="text-muted-sm">Create your first survey to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div key={survey.id} className="card">
              <h3 className="text-title-md font-semibold mb-2">{survey.title}</h3>
              <p className="text-body-sm text-muted mb-4">{survey.description || 'No description'}</p>
              <div className="flex items-center justify-between">
                <span className="text-caption bg-surface-muted px-2 py-1 rounded">{survey.question_count} questions</span>
                <span className={`text-caption px-2 py-1 rounded ${survey.status === 'active' ? 'bg-success-soft text-success' : 'bg-error-soft text-error'}`}>
                  {survey.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
