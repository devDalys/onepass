'use client';
import {useStore} from '@/providers/ContextProvider';
import {useMemo} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';
import {notFound} from 'next/navigation';
import {Accordion} from '@/ui-kit';

export default function AccountPage({params}: {params: {id: string}}) {
  const {accounts, isLoaded} = useStore();

  const currAccount = useMemo(() => {
    return accounts?.find((item) => item._id === params.id);
  }, [accounts, params.id]);

  const isOneAccount = currAccount?.accountEntries?.length === 1;

  if (!accounts?.length && !isLoaded) return <FullScreenLoading />;
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
