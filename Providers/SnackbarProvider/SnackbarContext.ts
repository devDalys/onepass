import {createContext} from 'react';

export interface SnackbarContext {
  showSnackbar: (text: string) => void;
}

export const snackbarContext = createContext<SnackbarContext>({showSnackbar: () => null});
