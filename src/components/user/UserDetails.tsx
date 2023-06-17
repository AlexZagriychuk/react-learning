import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectUserById } from "../../redux/modules/usersSlice";
import { EntityId } from "@reduxjs/toolkit";
import "./UserDetails.css"

export default function UserDetails() {
    const params = useParams();
    const userId = params.userId

    const user = useAppSelector(state => selectUserById(state, userId as EntityId))
    let userDetailsFields = [] as Array<{iconClass: string, label: string, value: string}>
    if(user) {
        const userAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
        userDetailsFields = [
            {iconClass: "", label: "Name", value: user.name},
            {iconClass: "", label: "User Name", value: user.username},
            {iconClass: "", label: "Email", value: user.email},
            {iconClass: "", label: "Phone", value: user.phone},
            {iconClass: "", label: "Website", value: user.website},
            {iconClass: "", label: "Address", value: userAddress},
            {iconClass: "", label: "Company", value: user.company.name},
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
                                <i className={"user-details-icon" + userDetailsField.iconClass}>x</i>
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