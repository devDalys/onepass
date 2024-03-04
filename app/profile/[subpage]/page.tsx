import ProfileMenu from '@/components/ProfileMenu';
import {lazy, Suspense} from 'react';
import {SuspenseLoader} from '@/ui-kit';
import {notFound} from 'next/navigation';
import {getProfile} from '@/components/Header/Header.api';

interface Props {
  params: {
    subpage: string;
  };
}

export default async function ProfilePage(props: Props) {
  const pages = {
    security: lazy(() => import('@/components/SecurityPage/SecurityPage')),
    help: lazy(() => import('@/components/Help/Help')),
    // about: lazy(() => import('@/components/Help/Help')),
  };
  const profile = await getProfile();
  const LazyComponent = pages[props.params.subpage as keyof typeof pages] ?? notFound();

  return (
    <ProfileMenu currentPage={props.params.subpage}>
      <Suspense fallback={<SuspenseLoader />}>
        <LazyComponent profile={profile} />
      </Suspense>
    </ProfileMenu>
  );
}
