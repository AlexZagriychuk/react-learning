export enum UserType {
    ADMIN = "ADMIN",
    WRITER = "WRITER",
    READER = "READER"
}

export interface User {
    id: number,
    type: UserType,
    name: string,
    avatar: string,
    registered: string
}

export interface Users {
    nextUserId: number,
    usersData: Array<User>
}

const getNextUserId = (usersData: Array<User>) : number => {
    return Math.max(...usersData.map(user => user.id)) + 1
}

export const getAllUsers = () : Users => {
    const usersData: Array<User> = [
        {
            id: 1,
            type: UserType.ADMIN,
            name: "Michael_Scott_Best_Admin",
            avatar: "/michael scott.jpg",
            registered: "12/23/2022"
        },
        {
            id: 2,
            type: UserType.WRITER,
            name: "Jane_Doe",
            avatar: "https://picsum.photos/id/342/300/200",
            registered: "2/12/2023"
        },
        {
            id: 3,
            type: UserType.WRITER,
            name: "John_771",
            avatar: "https://picsum.photos/id/281/300/200",
            registered: "2/27/2023"
        },
        {
            id: 4,
            type: UserType.READER,
            name: "Alisa",
            avatar: "https://picsum.photos/id/237/300/200",
            registered:"5/1/2023"
        }
    ]

    const nextUserId = getNextUserId(usersData)

    return {
        nextUserId,
        usersData
    }
}