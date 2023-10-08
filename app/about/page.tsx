import Link from 'next/link';

export default function page() {
  return (
    <div>
      Какая-то страница <Link href={'/'}>Главная</Link>
    </div>
  );
}
