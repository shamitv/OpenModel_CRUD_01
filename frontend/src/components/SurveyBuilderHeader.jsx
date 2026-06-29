import { useState, useCallback, useRef } from 'react';
import SaveStateIndicator from './SaveStateIndicator';
import { useSurveyStore } from '../store/surveyStore';

export default function SurveyBuilderHeader() {
  const { currentSurvey, updateSurvey, updateTitle, updateDescription, isSaving, isUnsaved } = useSurveyStore();
  const titleRef = useRef(null);

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    updateTitle(newTitle);
  }, [updateTitle]);

  const handleDescriptionChange = useCallback((e) => {
    const newDescription = e.target.value;
    updateDescription(newDescription);
  }, [updateDescription]);

  const handleSave = useCallback(async () => {
    if (!currentSurvey) return;
    try {
      setSaving(true);
      await updateSurvey(currentSurvey.id, {
        title: currentSurvey.title,
        description: currentSurvey.description,
      });
      setIsUnsaved(false);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }, [currentSurvey, updateSurvey]);

  const [saving, setSaving] = useState(false);

  const debouncedSave = useCallback(
    setTimeout(handleSave, 2000),
    [handleSave]
  );

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <div className="flex-1">
        <input
          ref={titleRef}
          type="text"
          value={currentSurvey?.title || ''}
          onChange={handleTitleChange}
          className="text-xl font-bold text-gray-900 border-none focus:outline-none focus:ring-0 bg-transparent w-full"
          placeholder="Survey title"
        />
        <textarea
          value={currentSurvey?.description || ''}
          onChange={handleDescriptionChange}
          className="text-sm text-gray-500 border-none focus:outline-none focus:ring-0 bg-transparent w-full mt-1 resize-none"
          placeholder="Description (optional)"
          rows={2}
        />
      </div>
      <div className="flex items-center gap-3 ml-6">
        <SaveStateIndicator isSaving={saving} isUnsaved={isUnsaved} />
      </div>
    </div>
  );
}
