'use client';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';

export default function AddAccountPage() {
  return (
    <div style={{paddingBottom: '5rem'}}>
      <AccountCreator createMode={true} />
    </div>
  );
}
