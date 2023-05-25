import { User } from "./users";



export default function UserListItem({avatar, name, type, registered}: User ) {
    return (
        <li>
            <img className="user-avatar" src={avatar} alt="" />
            <div className="user-info">
                <span className="user-name"><b>Name: </b>{name}</span>
                <span className="user-type"><b>Type: </b>{type}</span>
                <span className="user-registered"><b>Registered: </b>{registered.toLocaleDateString()}</span>
            </div>
        </li>
    )
}