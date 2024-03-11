import {useContext} from 'react';
import {ModalContext} from '@/providers/ModalProvider/ModalContext';

export {ModalProvider} from './ModalProvider';

export const useModal = () => useContext(ModalContext);
