import React from 'react';

interface Props {
  children: React.ReactNode;
  params: {
    subpage: string;
  };
}

export default function ProfilePageLayout({children}: Props) {
  return children;
}
