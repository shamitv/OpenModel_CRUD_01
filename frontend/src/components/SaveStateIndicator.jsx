import { useState, useEffect } from 'react';

export default function SaveStateIndicator({ isSaving, isUnsaved }) {
  const [state, setState] = useState(isSaving ? 'saving' : isUnsaved ? 'unsaved' : 'saved');

  useEffect(() => {
    if (isSaving) {
      setState('saving');
    } else if (isUnsaved) {
      setState('unsaved');
    } else {
      setState('saved');
    }
  }, [isSaving, isUnsaved]);

  const labels = {
    saving: 'Saving...',
    saved: 'Saved',
    unsaved: 'Unsaved changes',
  };

  const colors = {
    saving: 'bg-blue-500',
    saved: 'bg-green-500',
    unsaved: 'bg-yellow-500',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full ${colors[state] || colors.saved}`}></span>
      <span className={`text-sm font-medium ${
        state === 'saving' ? 'text-blue-600' : state === 'unsaved' ? 'text-yellow-600' : 'text-green-600'
      }`}>
        {labels[state]}
      </span>
    </div>
  );
}
