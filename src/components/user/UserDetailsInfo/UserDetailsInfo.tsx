import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import { User } from "../userTypes";
import styles from "./UserDetailsInfo.module.css"

export default function UserDetailsInfo({user}: {user: User}) {
    const [isImgLoading, setIsImgLoading] = useState(true)

    let userDetailsFields = [] as Array<{icon: IconDefinition, label: string, value: string}>
    if(user) {
        const userAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
        userDetailsFields = [
            {icon: icon({name: "user-tie"}), label: "Full Name", value: user.name},
            {icon: icon({name: "user"}), label: "User Name", value: user.username},
            {icon: icon({name: "users-viewfinder"}), label: "User Type", value: user.type},
            {icon: icon({name: "calendar-check"}), label: "Registered", value: user.registered},
            {icon: icon({name: "envelope"}), label: "Email", value: user.email},
            {icon: icon({name: "phone"}), label: "Phone", value: user.phone},
            {icon: icon({name: "globe"}), label: "Website", value: user.website},
            {icon: icon({name: "location-dot"}), label: "Address", value: userAddress},
            {icon: icon({name: "briefcase"}), label: "Company", value: user.company.name},
        ]    
    }

    return (
        <>
            {user === undefined
                ? <p>Loading...</p>
                : <div className={styles["user-details-info"]}>
                    {/* Empty placeholder div with aspect ratio 3/2 (66.66% value) to occupy img space while real image is loading */}
                    <div style={{ display: isImgLoading ? "block" : "none", width: '100%', height: '0', paddingBottom: '66.66%' }}></div>
                    <img 
                        className={styles["user-details-info-avatar"]}
                        src={user.avatarBig}
                        alt=""
                        style={{ display: isImgLoading ? "none" : "block" }}
                        onLoad={() => setIsImgLoading(false)}
                    />

                    <ul className={styles["user-details-info-list"]}>
                        {userDetailsFields.map(userDetailsField => {
                            return <li className={styles["user-details-info-list-item"]} key={userDetailsField.label}>
                                <FontAwesomeIcon className={styles["user-details-info-icon"]} icon={userDetailsField.icon} />
                                <div className={styles["user-details-info-data"]}>
                                    <span>{userDetailsField.value}</span>
                                    <span className={styles["user-details-info-data-label"]}>{userDetailsField.label}</span>
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