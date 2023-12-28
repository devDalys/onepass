import {useContext} from 'react';
import {AccountsContext} from './Context';

export const useStore = () => useContext(AccountsContext);
