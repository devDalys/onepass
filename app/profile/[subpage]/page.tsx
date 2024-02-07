import ProfileMenu from '@/components/ProfileMenu';
import {lazy, Suspense} from 'react';
import {SuspenseLoader} from '@/ui-kit';
import {NotFoundPage} from '@/components/NotFoundPage';
import {notFound} from 'next/navigation';

interface Props {
  params: {
    subpage: string;
  };
}

export default async function ProfilePage(props: Props) {
  const pages = {
    security: lazy(() => import('@/components/SecurityPage/SecurityPage')),
  };
  const LazyComponent = pages[props.params.subpage as keyof typeof pages] ?? notFound();

  return (
    <ProfileMenu currentPage={props.params.subpage}>
      <Suspense fallback={<SuspenseLoader />}>
        <LazyComponent />
      </Suspense>
    </ProfileMenu>
  );
}
