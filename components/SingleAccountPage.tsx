'use client';
import {useMemo} from 'react';
import {notFound} from 'next/navigation';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';
import {Accordion} from '@/ui-kit';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

interface Props {
  id: string;
  profile: Profile;
}

export default function SingleAccountPage({profile: {accounts}, id}: Props) {
  const currAccount = useMemo(() => {
    return accounts?.find((item) => item._id === id);
  }, [accounts, id]);

  const isOneAccount = currAccount?.accountEntries?.length === 1;

  if (!currAccount) return notFound();

  return (
    <div style={{paddingBottom: '5rem'}}>
      {isOneAccount && (
        <AccountCreator
          editMode
          disableEditDefault
          createMinifiedMode
          currentAccount={{...currAccount.accountEntries[0], socialName: currAccount.socialName}}
        />
      )}

      {!isOneAccount &&
        currAccount.accountEntries.map((account, index) => (
          <Accordion
            key={account._id}
            renderProps={() => (
              <AccountCreator
                editMode
                withWrapper={false}
                currentAccount={{...account, socialName: currAccount.socialName}}
              />
            )}
            title={`${index + 1}. ${currAccount.socialName}`}
            isDefaultOpened={!index}
            additionalInfo={
              currAccount.createdAt &&
              'Добавлен: ' + new Date(account.createdAt).toLocaleDateString()
            }
          />
        ))}

      {
        <Accordion
          renderProps={() => (
            <AccountCreator
              createMinifiedMode
              withWrapper={false}
              minifiedTitle
              currentAccount={{socialName: currAccount.socialName}}
            />
          )}
          title={'Новый аккаунт'}
        />
      }
    </div>
  );
}
