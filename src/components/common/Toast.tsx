import { CheckCircle2, X } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useCms();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-neutral-900 border border-amber-500/40 text-neutral-100 rounded-xl shadow-2xl animate-bounce-subtle text-xs">
      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="font-medium">{toastMessage}</span>
      <button
        onClick={() => showToast('')}
        className="text-neutral-400 hover:text-white ml-2 p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
