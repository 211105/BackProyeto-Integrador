import { ResponseLogin, User } from "./user";

export interface IUsuarioRepository {
    registerUser( 
        uuid: string,
        name: string,
        email: string,
        phone_number: string,
        img_url: string,
        password: string,
    ): Promise<User | null | string | Error> ;

    loginUser(
        email:string,
        password:string
    ):Promise<ResponseLogin | string | null>  //listo

    updateUserById( //listo 
        uuid: string,
        name?: string,
        email?: string,
        phone_number?: string,
        img_url?: string
    ): Promise<User | null>

    updatePassword(
        uuid: string, 
        password: string
        ): Promise<User | null>  //listo
}

