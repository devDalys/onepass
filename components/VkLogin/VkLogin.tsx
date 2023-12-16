'use client';
import React, {useEffect, useMemo, useRef} from 'react';
import * as VKID from '@vkid/sdk';

interface VkLoginProps {
  APP_ID: number;
  redirectUrl: string;
}

export default function VkLogin({APP_ID, redirectUrl}: VkLoginProps) {
  VKID.Config.set({
    app: APP_ID, // Идентификатор приложения.
    redirectUrl: redirectUrl, // Адрес для перехода после авторизации.
  });
  const ref = useRef<HTMLDivElement>(null);
  const oneTap = useMemo(() => new VKID.OneTap(), []);

  useEffect(() => {
    ref.current && oneTap.render({container: ref.current, styles: {height: 42}});
  }, []);

  return <div ref={ref} />;
}
