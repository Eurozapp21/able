import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Package, FileText, Download, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CatalogueCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export default function Catalogue() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const { data: categories = [], isLoading } = useQuery<CatalogueCategory[]>({
    queryKey: ['/api/catalogue/categories'],
  });

  const handleCategoryClick = (slug: string) => {
    console.log('Navigating to category:', slug);
    setLocation(`/catalogue/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">{t('catalogueCategory.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t('navigation.home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('navigation.catalogue')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg')`
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">{t('catalogue.hero.title')}</h1>
            <p className="text-xl max-w-2xl leading-relaxed">
              {t('catalogue.hero.subtitle')}
            </p>
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" style={{color: '#ffeb3b'}} />
                <span className="text-lg">{categories.length} {t('catalogue.stats.categories')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{color: '#ffeb3b'}} />
                <span className="text-lg">{t('catalogue.stats.brochures')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" style={{color: '#ffeb3b'}} />
                <span className="text-lg">{t('catalogue.stats.downloads')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('catalogue.browse.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('catalogue.browse.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden bg-white" 
              onClick={() => handleCategoryClick(category.slug)}
            >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div 
                      className="px-3 py-1 rounded-full text-black text-sm font-semibold"
                      style={{backgroundColor: '#ffeb3b'}}
                    >
                      <Package className="w-4 h-4 inline mr-1" />
                      {t('catalogue.categoryCard.brochures')}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileText className="w-4 h-4" />
                      <span>{t('catalogue.categoryCard.viewBrochures')}</span>
                    </div>
                    <ArrowRight 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                      style={{color: '#ffeb3b'}} 
                    />
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <div 
            className="inline-block p-8 rounded-2xl text-black"
            style={{backgroundColor: '#ffeb3b'}}
          >
            <h3 className="text-2xl font-bold mb-4">{t('catalogue.cta.title')}</h3>
            <p className="text-lg mb-6 max-w-2xl">
              {t('catalogue.cta.description')}
            </p>
            <Link href="/contact">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
                {t('catalogue.cta.button')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}