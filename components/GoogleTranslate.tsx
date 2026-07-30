'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslate() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/rcpanel7x');

  useEffect(() => {
    if (isAdminRoute) return;

    const windowAny = window as any;
    windowAny.googleTranslateElementInit = function () {
      if (windowAny.google && windowAny.google.translate) {
        new windowAny.google.translate.TranslateElement(
          {
            pageLanguage: 'id',
            includedLanguages: 'en,id,es,it,ja,ar,fr,zh-CN,ko',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete windowAny.googleTranslateElementInit;
    };
  }, [isAdminRoute]);

  if (isAdminRoute) return null;
  return <div id="google_translate_element" className="hidden" />;
}
