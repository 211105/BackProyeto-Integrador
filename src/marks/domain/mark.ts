
export class Mark {
    constructor(
        public uuid: string,
        public latitude: number,
        public longitude: number,
        public description: string,
        public createDate: string,
        public endDate: string,
        public urlImage: string,
        public userUuid: string,
        public activityUuid: string,
    ){}
}


export interface UserOwner {
    uuid: string;
    name: string;
    urlImage: string;
}

export interface UserAsist {
    uuid: string;
    name: string;
    urlImage: string;
}

export interface activity {
    uuid: string;
    name: string;
    urlImage: string;
}


export class MarkDescription {
    constructor(
        public uuid: string,
        public latitude: number,
        public longitude: number,
        public description: string,
        public createDate: string,
        public endDate: string,
        public urlImage: string,
        public userUuid: string,
        public activityUuid: string,
        public userOwners: UserOwner[],
        public userAsists: UserAsist[],
        public infoActivity: activity
    ) {}
}


//hacer un mark response 
// retornaria
// public latitude: DOUBLE,
// public longitude: DOUBLE,
// public description: string,
// public create_date: string,
// public end_date: string,
// public urlImage: string,
// public owner: string (nombre del usuario)
// public urlImageOwner: string (imagen del usuario)
// publi listparticipantes: no se que tipo de datos (la lista de participantes)
