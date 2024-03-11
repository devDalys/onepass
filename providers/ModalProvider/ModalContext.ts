'use client';
import React from 'react';

export interface CreateModalProps {
  title: string;
  children: () => React.ReactNode;
}

interface ModalContext {
  createModal: (props: CreateModalProps) => void;
  hideModal: () => void;
}
export const ModalContext = React.createContext<ModalContext>({
  createModal: () => null,
  hideModal: () => null,
});
