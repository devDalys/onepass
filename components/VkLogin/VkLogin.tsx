'use client';
import React, {useEffect, useMemo, useRef} from 'react';
import * as VKID from '@vkid/sdk';

interface VkLoginProps {}

const APP_ID = process.env['VK_APP_ID'];
const REDIRECT_URL = process.env['REDIRECT_URL'];

VKID.Config.set({
  app: APP_ID, // Идентификатор приложения.
  redirectUrl: REDIRECT_URL, // Адрес для перехода после авторизации.
});
export default function VkLogin({}: VkLoginProps) {
  const ref = useRef<HTMLDivElement>(null);
  const oneTap = useMemo(() => new VKID.OneTap(), []);

  useEffect(() => {
    ref.current && oneTap.render({container: ref.current, styles: {height: 42}});
  }, []);

  return <div ref={ref} />;
}
