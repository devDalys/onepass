import RecoveryForm from '@/components/RecoveryForm/RecoveryForm';
import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';

export default function RecoveryPage() {
  revalidatePath('/recovery');
  let recovery;
  let cookie = cookies()?.get('OPRecovery')?.value;

  if (cookie) {
    try {
      recovery = JSON.parse(decodeURIComponent(cookie));
    } catch (e) {
      recovery = undefined;
    }
  }

  return <RecoveryForm recovery={recovery} />;
}
