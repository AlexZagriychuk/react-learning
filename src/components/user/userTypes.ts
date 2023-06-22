export enum UserType {
    ADMIN = "ADMIN",
    WRITER = "WRITER",
    READER = "READER"
}

export interface User {
    id: number,
    type: UserType,
    registered: string,
    name: string,
    username: string,
    avatarSmall: string,
    avatarBig: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export interface Users {
    nextUserId: number,
    usersData: Array<User>
}

export interface UserAlbum {
    id: number;
    userId: number,
    title: string;
}
