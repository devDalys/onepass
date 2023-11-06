import {_api} from '@/api';
import {cookies} from 'next/headers';

const getAccounts = async () => {
  return await _api(cookies().get('token')?.value).get('/accounts');
};

export default async function AccountsPage() {
  const {data} = await getAccounts();

  return <div>Аккаунты</div>;
}
