'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslate() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/rcpanel7x');

  useEffect(() => {
    if (isAdminRoute) return;

    const windowAny = window as any;

    // Init function called by the GT script callback
    const initTranslate = () => {
      if (windowAny.google?.translate && !windowAny._gtInitialized) {
        windowAny._gtInitialized = true;
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

    // Expose the callback the GT script will call
    windowAny.googleTranslateElementInit = initTranslate;

    // Only inject the script once — check if already present in DOM
    const existing = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (!existing) {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      // Fallback: if the callback fires before onload, also try on load
      script.onload = initTranslate;
      document.body.appendChild(script);
    } else {
      // Script already loaded from a previous navigation — init directly
      initTranslate();
    }

    // Cleanup: only clear the flag and callback, never remove the script
    // Removing the script would break the translate widget on route changes
    return () => {
      delete windowAny.googleTranslateElementInit;
      delete windowAny._gtInitialized;
    };
  }, [isAdminRoute]);

  if (isAdminRoute) return null;
  return <div id="google_translate_element" />;
}
