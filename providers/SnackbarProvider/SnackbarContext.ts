import {createContext} from 'react';

export interface SnackbarContext {
  showSnackbar: (text: string) => void;
}

export const SnackbarContext = createContext<SnackbarContext>({showSnackbar: () => null});
