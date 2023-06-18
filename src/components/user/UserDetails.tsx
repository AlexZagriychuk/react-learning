import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectUserById } from "../../redux/modules/usersSlice";
import { EntityId } from "@reduxjs/toolkit";
import "./UserDetails.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function UserDetails() {
    const params = useParams();
    const userId = params.userId

    const user = useAppSelector(state => selectUserById(state, userId as EntityId))
    let userDetailsFields = [] as Array<{icon: IconDefinition, label: string, value: string}>
    if(user) {
        const userAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
        userDetailsFields = [
            {icon: icon({name: "user-tie"}), label: "Name", value: user.name},
            {icon: icon({name: "user"}), label: "User Name", value: user.username},
            {icon: icon({name: "envelope"}), label: "Email", value: user.email},
            {icon: icon({name: "phone"}), label: "Phone", value: user.phone},
            {icon: icon({name: "globe"}), label: "Website", value: user.website},
            {icon: icon({name: "location-dot"}), label: "Address", value: userAddress},
            {icon: icon({name: "briefcase"}), label: "Company", value: user.company.name},
        ]    
    }

    return (
        <>
            <h2>User Details:</h2>
            {user === undefined
                ? <p>Loading...</p>
                : <div className="user-details">
                    <img className="user-details-avatar" src={user.avatarBig} alt="" />
                    <ul className="user-details-list">
                        {userDetailsFields.map(userDetailsField => {
                            return <li className="user-details-list-item" key={userDetailsField.label}>
                                <FontAwesomeIcon className="user-details-icon" icon={userDetailsField.icon} />
                                <div className="user-details-data">
                                    <span className="user-details-data-value">{userDetailsField.value}</span>
                                    <span className="user-details-data-label">{userDetailsField.label}</span>
                                </div>
                            </li>
                        })}
                    </ul>
                    <label htmlFor=""></label>
                </div>
            }
        </>
    )
}