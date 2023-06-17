import { User } from "./users";
import { useNavigate } from "react-router-dom";

export default function UserListItem({id, avatar, name, username, type, registered}: User ) {
    const navigate = useNavigate();
    
    return (
        <li className="user" onClick={() => navigate(`./${id}`)}>
            <img className="user-avatar" src={avatar} alt="" />
            <div className="user-info">
                <span className="user-name"><b>UserName: </b>{username}</span>
                <span className="user-name"><b>Name: </b>{name}</span>
                <span className="user-type"><b>Type: </b>{type}</span>
                <span className="user-registered"><b>Registered: </b>{registered}</span>
            </div>
        </li>
    )
}