

export class User {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public img_url: string,
    public password: string,
    ){}
}

export class ResponseLogin {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public img_url: string,
    public token: string
    ){}
}
