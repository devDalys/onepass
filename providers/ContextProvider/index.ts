import {useContext} from 'react';
import {AccountsContext} from '@/providers/ContextProvider/Context';

export {AccountsContext} from './Context';
export {ContextProvider} from './ContextProvider';

export const useAccountsContext = () => useContext(AccountsContext);
