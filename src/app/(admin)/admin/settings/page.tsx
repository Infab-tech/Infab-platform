import { getAdminEmailNotificationSetting } from '@/app/actions/settings';
import AdminSettingsToggle from './AdminSettingsToggle';

export default async function SettingsPage() {
  const isEnabled = await getAdminEmailNotificationSetting();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">System Settings</h1>
        <p className="text-[var(--text-secondary)]">Manage global configuration for the INFAB platform.</p>
      </div>

      <div className="space-y-6">
        <AdminSettingsToggle initialValue={isEnabled} />
      </div>
    </div>
  );
}
