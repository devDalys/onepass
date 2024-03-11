export interface IAccountItem {
  login: string;
  password: string;
  _id?: string;
  socialName: string;
}

export interface AccountsResponse {
  socialName: string;
  _id: string;
  createdAt: Date;
  accountEntries: {
    login: string;
    password: string;
    _id: string;
    createdAt: Date;
  }[];
}
