'use server';
import {revalidatePath, revalidateTag} from 'next/cache';

export const revalidateCache = () => {
  revalidatePath('/accounts');
};

export const revalidateQuery = () => {
  console.log('revalidate');
  revalidateTag('accounts');
};
