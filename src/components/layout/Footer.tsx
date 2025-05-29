'use client';
import { Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">{t('appName')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('appDescription')}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">{t('features')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('featuresList.feature1.title')}</li>
              <li>{t('featuresList.feature2.title')}</li>
              <li>{t('featuresList.feature3.title')}</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@realestate-saas.com</li>
              <li>03-1234-5678</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 Real Estate SaaS Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}