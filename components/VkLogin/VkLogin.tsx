'use client';
import React, {useEffect, useMemo, useRef} from 'react';
import * as VKID from '@vkid/sdk';
import {Scheme} from '@vkid/sdk';
import {useTheme} from '@/providers/ThemeProvider';

interface VkLoginProps {
  APP_ID: number;
  redirectUrl: string;
}

export default function VkLogin({APP_ID, redirectUrl}: VkLoginProps) {
  VKID.Config.set({
    app: APP_ID,
    redirectUrl: redirectUrl,
  });
  const ref = useRef<HTMLDivElement>(null);
  const oneTap = useMemo(() => new VKID.OneTap(), []);
  const {theme} = useTheme();

  useEffect(() => {
    ref.current &&
      oneTap.render({
        container: ref.current,
        styles: {height: 42},
        scheme: theme === 'app_dark_theme' ? Scheme.DARK : Scheme.LIGHT,
      });
  }, []);

  return <div onClick={(event) => event.preventDefault()} ref={ref} />;
}
