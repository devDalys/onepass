import {createContext} from 'react';

export interface SnackbarContext {
  showSnackbar: (text: string, autoClose?: boolean) => void;
}

export const SnackbarContext = createContext<SnackbarContext>({showSnackbar: () => null});
