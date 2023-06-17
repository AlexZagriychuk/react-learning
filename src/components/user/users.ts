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

export const getNextUserId = (usersData: Array<User>) : number => {
    return Math.max(...usersData.map(user => user.id)) + 1
}

export const getUnknownUser = () : User => {
    return {
        id: 0,
        type: UserType.READER,
        name: "Unknown",
        username: "Unknown",
        avatarSmall: "/react/Unknown_person.jpg",
        avatarBig: "/react/Unknown_person.jpg",
        registered: "-",
        email: "-",
        address: {
            street: "-",
            suite: "-",
            city: "-",
            zipcode: "-",
            geo: {
                lat: "-",
                lng: "-"
            }
        },
        phone: "-",
        website: "-",
        company: {
            name: "-",
            catchPhrase: "-",
            bs: "-"
        }
    }
}

const getDefaultAdminRegisteredDate = () => {
    let date = new Date()
    date.setFullYear(date.getFullYear() - 2)
    return date.toLocaleDateString()
}

export const getFakeAdminUser = (userId = 1, registered = getDefaultAdminRegisteredDate()) : User => {
    return {
        id: userId,
        type: UserType.ADMIN,
        name: "Michael Scott",
        username: "Michael_Scott_Best_Admin",
        avatarBig: "/react/michael scott.jpg",
        avatarSmall: "/react/michael scott.jpg",
        registered: registered,
        email: "michael_scott@dunder.mifflin.com",
        address: {
            street: "Slough Avenue",
            suite: "1725",
            city: "Scranton, PA",
            zipcode: "18505-7427",
            geo: {
                lat: "41.411835",
                lng: "-75.665245"
            }
        },
        phone: "1-999-123-4567",
        website: "https://dundermifflinpaper.com/",
        company: {
            name: "Dunder Mifflin Paper Company, Inc",
            catchPhrase: "Limitless Paper in a Paperless World",
            bs: "We provide you the highest quality paper, the best possible service, at the lowest possible prices"
        }
    }
}