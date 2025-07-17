import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language === 'gr' ? 'Greek' : 'English';
  const otherLanguage = i18n.language === 'gr' ? 'English' : 'Greek';
  const otherLanguageCode = i18n.language === 'gr' ? 'en' : 'gr';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-custom hover:text-primary-gold transition-colors">
          <Globe className="w-4 h-4 mr-2" />
          {currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage(otherLanguageCode)}>
          {t('language.switchTo', { language: otherLanguage })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}