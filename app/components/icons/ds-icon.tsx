"use client";
import React from 'react';

export const DS_LOGO_TRANSPARENT_WHITE = "https://i.imgur.com/1F8Zkxx.png";
export const DS_LOGO_TRANSPARENT_BLACK = "https://i.imgur.com/2zwss38.png";

export default function DSIcon(){
  const [imageSrc, setImageSrc] = React.useState<string>(DS_LOGO_TRANSPARENT_BLACK);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setImageSrc(prefersDarkMode ? DS_LOGO_TRANSPARENT_WHITE : DS_LOGO_TRANSPARENT_BLACK);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateImageSrc = () => {
        setImageSrc(mediaQuery.matches ? DS_LOGO_TRANSPARENT_WHITE : DS_LOGO_TRANSPARENT_BLACK);
      };
      mediaQuery.addEventListener('change', updateImageSrc);
      return () => mediaQuery.removeEventListener('change', updateImageSrc);
    }
  }, []);

  return <img src={imageSrc} alt="DS logo" className="max-w-6" />;
};