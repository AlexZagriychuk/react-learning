import { useParams } from "react-router-dom";

export default function UserDetails() {
    const params = useParams();
    const userId = params.userId
    
    return (
        <h2>User Details {userId}:</h2>
    )
}