import ProfileMenu from '@/components/ProfileMenu';

interface Props {
  params: {
    subpage: string;
  };
}

export default function ProfilePage(props: Props) {
  return <ProfileMenu currentPage={props.params.subpage} />;
}
