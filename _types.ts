export interface IUser {
    id: number; 
    email: string; 
    password?: string; 
    activation_link?: string; 
    is_activated?: boolean;
}

export interface IToken {
    id: number; 
    refresh_token: string;
    user_id: number;
}
