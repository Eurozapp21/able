import { PreferencesPanel } from '@/components/preferences-panel';

export default function PreferencesPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Preferences</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalize your AbleTools experience with dynamic settings that adapt to your needs and preferences
          </p>
        </div>
        
        <PreferencesPanel />
      </div>
    </div>
  );
}