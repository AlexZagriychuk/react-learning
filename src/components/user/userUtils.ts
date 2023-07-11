import { User, UserType } from "./userTypes";


export const getUnknownUser = (): User => {
    return {
        id: 0,
        type: UserType.READER,
        name: "Unknown",
        username: "Unknown",
        avatarSmall: "/portfolio/simple-fullstack-app/Unknown_person.jpg",
        avatarBig: "/portfolio/simple-fullstack-app/Unknown_person.jpg",
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
    };
};
