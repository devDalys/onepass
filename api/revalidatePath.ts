'use server';
import {revalidatePath, revalidateTag} from 'next/cache';

export const revalidateCache = () => {
  revalidatePath('/accounts', 'page');
};

export const revalidateQuery = () => {
  revalidateTag('profile');
};
