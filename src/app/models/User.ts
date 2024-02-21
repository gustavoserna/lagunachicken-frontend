import { Role } from "./Role";

export class User{

    idUsername: number = 0;
    username: string = "";
    email: string = "";
    password: string = "";
    roles: Role[] = [];

}