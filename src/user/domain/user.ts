

export class User {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public img_url: string,
    public password: string,
    public type_user: string,
    ){}
}

export class ResponseLogin {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public img_url: string,
    public type_user: string,
    public token: string
    ){}
}

export class ResponseLoginAllUsers{
    constructor(
        public data_user:[],
        public token: string
    ){}    
}

export interface UserOwner {
    uuid: string;
    name: string;
    urlImage: string;
}


