import { Owner } from "./owner";

export interface OwnerRepository{
    registerOwner(
        uuid:string, 
        name:string,
        surname:string,
        second_surname:string,
        email:string,
        password:string,
        phone_number:string,
        img_url:string,
        type_user:string,
        status:boolean):Promise<Owner | null| Error | string>;

}