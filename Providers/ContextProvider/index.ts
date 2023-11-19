import {useContext} from 'react';
import {AccountsContext} from '@/Providers/ContextProvider/Context';

export {AccountsContext} from './Context';
export {ContextProvider} from './ContextProvider';

export const useAccountsContext = () => useContext(AccountsContext);
