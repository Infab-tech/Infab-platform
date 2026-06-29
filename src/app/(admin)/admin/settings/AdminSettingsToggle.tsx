'use client';

import { useState, useTransition } from 'react';
import { setAdminEmailNotificationSetting } from '@/app/actions/settings';

export default function AdminSettingsToggle({ initialValue }: { initialValue: boolean }) {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    startTransition(async () => {
      const result = await setAdminEmailNotificationSetting(newValue);
      if (!result.success) {
        // Revert on failure
        setIsEnabled(!newValue);
        alert('Failed to update setting');
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-6 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl max-w-2xl">
      <div>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Email Notifications</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Receive emails at <span className="font-mono bg-[var(--bg-secondary)] px-1 py-0.5 rounded text-[var(--accent-primary)]">info@infab-tech.com</span> for new quotes, inquiries, and customer replies.
        </p>
      </div>
      
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 ${
          isEnabled ? 'bg-[var(--accent-primary)]' : 'bg-gray-400 dark:bg-gray-600'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        role="switch"
        aria-checked={isEnabled}
      >
        <span className="sr-only">Toggle email notifications</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isEnabled ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
