'use client';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useMemo} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';
import {notFound} from 'next/navigation';
import {Accordion} from '@/ui-kit';

export default function AccountPage({params}: {params: {id: string}}) {
  const {accounts} = useAccountsContext();

  const currAccount = useMemo(() => {
    return accounts?.find((item) => item._id === params.id);
  }, [accounts, params.id]);

  if (!accounts?.length) return <FullScreenLoading />;

  if (!currAccount) return notFound();

  if (currAccount?.accountEntries?.length === 1)
    return (
      <AccountCreator
        currentAccount={{...currAccount.accountEntries[0], socialName: currAccount.socialName}}
      />
    );

  return currAccount.accountEntries.map((account, index) => (
    <Accordion
      key={account._id}
      renderProps={() => (
        <AccountCreator
          isSimpleMode
          currentAccount={{...account, socialName: currAccount.socialName}}
        />
      )}
      title={`${index + 1}. ${currAccount.socialName}`}
      isDefaultOpened={!index}
      additionalInfo={
        currAccount.createdAt && 'Added: ' + new Date(currAccount.createdAt).toLocaleDateString()
      }
    />
  ));
}
