import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { usePreferences } from '@/hooks/use-preferences';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Eye, 
  Globe, 
  Grid, 
  Bell, 
  Accessibility, 
  Monitor,
  Sun,
  Moon,
  Smartphone,
  RefreshCw,
  Save
} from 'lucide-react';

export function PreferencesPanel() {
  const { preferences, updateSinglePreference, updatePreferences, resetToDefaults, isLoading, isSaving } = usePreferences();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveAll = () => {
    updatePreferences(preferences);
    toast({
      title: "Preferences saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    resetToDefaults();
    toast({
      title: "Preferences reset",
      description: "All settings have been restored to defaults.",
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            User Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-yellow-600" />
          Dynamic User Preferences
        </CardTitle>
        <CardDescription>
          Customize your experience with personalized settings that persist across sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="display">
              <Eye className="h-4 w-4 mr-2" />
              Display
            </TabsTrigger>
            <TabsTrigger value="language">
              <Globe className="h-4 w-4 mr-2" />
              Language
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="accessibility">
              <Accessibility className="h-4 w-4 mr-2" />
              Accessibility
            </TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Theme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Color Scheme</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) => updateSinglePreference('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Auto (System)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Product Display Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Product Display
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productView">Default View</Label>
                    <Select
                      value={preferences.productView}
                      onValueChange={(value) => updateSinglePreference('productView', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productsPerPage">Products Per Page</Label>
                    <Select
                      value={preferences.productsPerPage}
                      onValueChange={(value) => updateSinglePreference('productsPerPage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 products</SelectItem>
                        <SelectItem value="24">24 products</SelectItem>
                        <SelectItem value="48">48 products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sortBy">Default Sort</Label>
                    <Select
                      value={preferences.sortBy}
                      onValueChange={(value) => updateSinglePreference('sortBy', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="featured">Featured First</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showPrices"
                        checked={preferences.showPrices}
                        onCheckedChange={(checked) => updateSinglePreference('showPrices', checked)}
                      />
                      <Label htmlFor="showPrices">Show Prices</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showAvailability"
                        checked={preferences.showAvailability}
                        onCheckedChange={(checked) => updateSinglePreference('showAvailability', checked)}
                      />
                      <Label htmlFor="showAvailability">Show Availability</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language & Region</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Interface Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => updateSinglePreference('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="el">Ελληνικά (Greek)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => updateSinglePreference('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what updates you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="newProducts"
                    checked={preferences.notifications.newProducts}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('notifications', {
                        ...preferences.notifications,
                        newProducts: checked
                      })
                    }
                  />
                  <Label htmlFor="newProducts">New Product Announcements</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="priceUpdates"
                    checked={preferences.notifications.priceUpdates}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('notifications', {
                        ...preferences.notifications,
                        priceUpdates: checked
                      })
                    }
                  />
                  <Label htmlFor="priceUpdates">Price Updates & Promotions</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="seminars"
                    checked={preferences.notifications.seminars}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('notifications', {
                        ...preferences.notifications,
                        seminars: checked
                      })
                    }
                  />
                  <Label htmlFor="seminars">Seminar & Training Updates</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="newsletters"
                    checked={preferences.notifications.newsletters}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('notifications', {
                        ...preferences.notifications,
                        newsletters: checked
                      })
                    }
                  />
                  <Label htmlFor="newsletters">Newsletter Subscriptions</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility Options</CardTitle>
                <CardDescription>
                  Customize the interface for better accessibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="highContrast"
                    checked={preferences.accessibility.highContrast}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('accessibility', {
                        ...preferences.accessibility,
                        highContrast: checked
                      })
                    }
                  />
                  <Label htmlFor="highContrast">High Contrast Mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="largeFonts"
                    checked={preferences.accessibility.largeFonts}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('accessibility', {
                        ...preferences.accessibility,
                        largeFonts: checked
                      })
                    }
                  />
                  <Label htmlFor="largeFonts">Large Font Sizes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="reducedMotion"
                    checked={preferences.accessibility.reducedMotion}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('accessibility', {
                        ...preferences.accessibility,
                        reducedMotion: checked
                      })
                    }
                  />
                  <Label htmlFor="reducedMotion">Reduce Motion & Animations</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="screenReader"
                    checked={preferences.accessibility.screenReader}
                    onCheckedChange={(checked) => 
                      updateSinglePreference('accessibility', {
                        ...preferences.accessibility,
                        screenReader: checked
                      })
                    }
                  />
                  <Label htmlFor="screenReader">Screen Reader Optimizations</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="flex items-center gap-2">
            {isSaving && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Saving...
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveAll} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}