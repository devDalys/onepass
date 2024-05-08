import {createContext} from 'react';

export interface SnackbarContext {
  showSnackbar: (text: string, isError?: boolean) => void;
}

export const SnackbarContext = createContext<SnackbarContext>({showSnackbar: () => null});
