import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://onepassword.ru',
      lastModified: new Date(),
    },
    {
      url: 'https://onepassword.ru/login',
      lastModified: new Date(),
    },
    {
      url: 'https://onepassword.ru/register',
      lastModified: new Date(),
    },
    {
      url: 'https://onepassword.ru/profile',
      lastModified: new Date(),
    },
    {
      url: 'https://onepassword.ru/accounts',
      lastModified: new Date(),
    },
  ];
}
