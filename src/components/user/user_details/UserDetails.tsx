import { useParams } from "react-router-dom";
import "./UserDetails.css"
import { useState } from "react";
import UserDetailsInfo from "./UserDetailsInfo";

export default function UserDetails() {
    const params = useParams();
    const userId = parseInt(params.userId as string)

    enum UserDetailsTab {
        "Info",
        "Albums",
        "ToDo",
        "Posts"
    }

    const [activeTab, setActiveTab] = useState(UserDetailsTab.Info)

    return (
        <>
            <h2>User Details:</h2>

            <ul className="user-details-tabs">
                {Object.entries(UserDetailsTab).filter(userDetailsTab => isNaN(parseInt(userDetailsTab[0]))).map(tabEntry => 
                    <li 
                        key={tabEntry[0]}
                        className={activeTab === tabEntry[1] as UserDetailsTab ? "active" : ""}
                        onClick={() => setActiveTab(tabEntry[1] as UserDetailsTab)}
                    >{tabEntry[0]}</li>
                )}
            </ul>

            <div className="user-details-content">
                <UserDetailsInfo userId={userId} />
            </div>
        </>
    )
}