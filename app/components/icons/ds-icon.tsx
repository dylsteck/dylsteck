"use client";
import React from 'react';
import { DS_LOGO_TRANSPARENT_BLACK, DS_LOGO_TRANSPARENT_WHITE } from 'app/consts';

export default function DSIcon(){
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [imageSrc, setImageSrc] = React.useState<string>(
    prefersDarkMode ? DS_LOGO_TRANSPARENT_WHITE : DS_LOGO_TRANSPARENT_BLACK
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateImageSrc = () => {
      setImageSrc(mediaQuery.matches ? DS_LOGO_TRANSPARENT_WHITE : DS_LOGO_TRANSPARENT_BLACK);
    };
    mediaQuery.addEventListener('change', updateImageSrc);
    return () => mediaQuery.removeEventListener('change', updateImageSrc);
  }, []);

  return <img src={imageSrc} alt="DS logo" className="max-w-6" />;
};