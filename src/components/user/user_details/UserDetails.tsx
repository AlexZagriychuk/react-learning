import { useParams } from "react-router-dom";
import "./UserDetails.css"
import UserDetailsInfo from "./UserDetailsInfo";

export default function UserDetails() {
    const params = useParams();
    const userId = parseInt(params.userId as string)

    return (
        <>
            <h2>User Details:</h2>

            <div className="user-details-content">
                <UserDetailsInfo userId={userId} />
            </div>
        </>
    )
}