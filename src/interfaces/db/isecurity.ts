import { ILogin } from "./ilogin";

export interface IDBSecurity {
    login: ILogin;
    [key: string]: any;
}
