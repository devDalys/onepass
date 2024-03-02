import {useContext} from 'react';
import {SnackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';

export const useSnackbar = () => useContext(SnackbarContext);
