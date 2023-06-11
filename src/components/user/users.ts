export enum UserType {
    ADMIN = "ADMIN",
    WRITER = "WRITER",
    READER = "READER"
}

export interface User {
    id: number,
    type: UserType,
    name: string,
    username: string,
    avatar: string,
    registered: string
}

export interface Users {
    nextUserId: number,
    usersData: Array<User>
}

export const getNextUserId = (usersData: Array<User>) : number => {
    return Math.max(...usersData.map(user => user.id)) + 1
}

export const getUnknownUser = () : User => {
    return {
        id: 0,
        type: UserType.READER,
        name: "Unknown",
        username: "Unknown",
        avatar: "/react/Unknown_person.jpg",
        registered: "-"
    }
}