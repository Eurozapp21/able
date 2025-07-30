import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { PreferenceSettings } from '@shared/schema';

const defaultPreferences: PreferenceSettings = {
  theme: 'light',
  language: 'en',
  currency: 'EUR',
  productView: 'grid',
  productsPerPage: '12',
  sortBy: 'name',
  showPrices: true,
  showAvailability: true,
  favoriteCategories: [],
  notifications: {
    newProducts: true,
    priceUpdates: false,
    seminars: true,
    newsletters: true,
  },
  accessibility: {
    highContrast: false,
    largeFonts: false,
    reducedMotion: false,
    screenReader: false,
  },
};

export function usePreferences() {
  const queryClient = useQueryClient();
  const [localPreferences, setLocalPreferences] = useState<PreferenceSettings>(defaultPreferences);

  // Fetch user preferences
  const { data: userPrefs, isLoading } = useQuery({
    queryKey: ['/api/preferences'],
    queryFn: async () => {
      const response = await fetch('/api/preferences');
      if (!response.ok) throw new Error('Failed to fetch preferences');
      return response.json();
    },
    retry: false,
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (newPreferences: Partial<PreferenceSettings>) => {
      return await apiRequest('/api/preferences', {
        method: 'POST',
        body: JSON.stringify(newPreferences),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  // Update single preference mutation
  const updateSinglePreferenceMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      return await apiRequest(`/api/preferences/${key}`, {
        method: 'PATCH',
        body: JSON.stringify({ value }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  // Sync preferences with state
  useEffect(() => {
    if (userPrefs?.preferences) {
      setLocalPreferences({ ...defaultPreferences, ...userPrefs.preferences });
    }
  }, [userPrefs]);

  // Apply accessibility preferences to document
  useEffect(() => {
    const { accessibility } = localPreferences;
    
    // High contrast
    if (accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Large fonts
    if (accessibility.largeFonts) {
      document.documentElement.classList.add('large-fonts');
    } else {
      document.documentElement.classList.remove('large-fonts');
    }

    // Reduced motion
    if (accessibility.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [localPreferences.accessibility]);

  // Apply theme preferences
  useEffect(() => {
    const { theme } = localPreferences;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'auto') {
      // Auto theme based on system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [localPreferences.theme]);

  const updatePreferences = (newPreferences: Partial<PreferenceSettings>) => {
    const merged = { ...localPreferences, ...newPreferences };
    setLocalPreferences(merged);
    updatePreferencesMutation.mutate(merged);
  };

  const updateSinglePreference = (key: keyof PreferenceSettings, value: any) => {
    const updated = { ...localPreferences, [key]: value };
    setLocalPreferences(updated);
    updateSinglePreferenceMutation.mutate({ key, value });
  };

  const resetToDefaults = () => {
    setLocalPreferences(defaultPreferences);
    updatePreferencesMutation.mutate(defaultPreferences);
  };

  return {
    preferences: localPreferences,
    updatePreferences,
    updateSinglePreference,
    resetToDefaults,
    isLoading,
    isSaving: updatePreferencesMutation.isPending || updateSinglePreferenceMutation.isPending,
  };
}