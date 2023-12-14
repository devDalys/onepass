import {useContext} from 'react';
import {snackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';

export const useSnackbar = () => useContext(snackbarContext);
