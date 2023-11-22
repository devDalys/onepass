import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {cookies} from 'next/headers';

const getAccounts = async (token: string): Promise<IAccountItem[]> => {
  const data = await _api.get('/accounts');
  return Object.values(data.data.body);
};

export default async function AccountPage({params}: {params: {id: string}}) {
  const token = cookies().get('token')?.value;
  const account = await getAccounts(token as string).then((data) =>
    data.find((item) => item._id === params.id),
  );
  return <div>{account?.socialName}</div>;
}
