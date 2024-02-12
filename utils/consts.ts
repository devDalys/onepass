export const AUTH_TOKEN = 'token';
export const ONE_MONTH = 2592000;

export const AUTHORIZATION_FLAG = 'authorized';

export const validationMessages = {
  min: (length: number) => `Минимальная длина - ${length}`,
  max: (length: number) => `Максимальная длина - ${length}`,
  required: () => `Это обязательное поле`,
  email: () => 'Неправильный формат почты',
  repeatValue: (field: string) => `${field} не должны различаться`,
};

export const MIN_PASSWORD_LENGTH = 5;
export const MAX_PASSWORD_LENGTH = 20;
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 20;
