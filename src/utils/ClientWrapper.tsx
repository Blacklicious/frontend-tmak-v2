"use client"; // Ensure this is a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Detect the user's OS language
    const userLang = navigator.language.slice(0, 2);
    const supportedLocales = ['en', 'fr', 'zh', 'ar', 'es', 'ru', 'pt', 'ja', 'hi', 'de'];
    
    // If the user's language is supported, navigate to that locale; otherwise, default to 'en'
    const matchedLocale = supportedLocales.includes(userLang) ? userLang : 'en';

    // Redirect to the appropriate locale if not already in the correct one
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith(`/${matchedLocale}`)) {
      router.push(`/${matchedLocale}${currentPath}`);
    }
  }, [router]);

  return <>{children}</>;
}