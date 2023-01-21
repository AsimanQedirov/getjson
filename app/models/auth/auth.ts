export interface IUser {
    guest: 0 | 1;
    id: string;
    name: string;
    total_api: number;
}

export interface IAuth {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: IUser;
}

export interface IRegister {
    email: string;
    name: string
}
