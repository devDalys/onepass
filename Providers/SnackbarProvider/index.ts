import {useContext} from 'react';
import {snackbarContext} from '@/Providers/SnackbarProvider/SnackbarContext';

export const useSnackbar = () => useContext(snackbarContext);
