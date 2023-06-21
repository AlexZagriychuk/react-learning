import { useParams } from "react-router-dom";
import "./UserDetails.css"
import { useLayoutEffect, useMemo, useState } from "react";
import UserDetailsInfo from "./UserDetailsInfo";
import UserDetailsPosts from "./UserDetailsPosts";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserById, useGetUsersQuery } from "../../../redux/modules/usersSlice";
import { EntityId } from "@reduxjs/toolkit";
import { User } from "../users";
import UserDetailsToDo from "./UserDetailsToDo";
import UserDetailsAlbums from "./UserDetailsAlbums";

export default function UserDetails() {
    const params = useParams();
    const userId = parseInt(params.userId as string)
    const { isLoading, isError, error } = useGetUsersQuery(undefined) // In case if URL /users/:userId is opened directly
    const user = useAppSelector(state => selectUserById(state, userId as EntityId)) as User

    // Scroll to the top of the page when we navigate from another page and our scroll wasn't at the top
    useLayoutEffect(() => {
        window.scrollTo(0,0)
    }, [])

    enum UserDetailsTab {
        "Info",
        "Albums",
        "ToDo",
        "Posts"
    }

    const [activeTab, setActiveTab] = useState(UserDetailsTab.Info)

    const currentTab = useMemo(() => {
        switch (activeTab) {
            case UserDetailsTab.Info:
                return <UserDetailsInfo user={user} />;
            case UserDetailsTab.Albums:
                return <UserDetailsAlbums user={user} />;
            case UserDetailsTab.ToDo:
                return <UserDetailsToDo user={user} />;
            case UserDetailsTab.Posts:
                return <UserDetailsPosts user={user} />;
        }
    }, [activeTab, user]);
    
    let content;
    if (isError) {
      content = <div>{error.toString()}</div>;
    } else if (isLoading) {
      content = <div>Loading...</div>;
    } else {
      content = currentTab;
    }
  
    return (
        <>
            <h2>User Details{user ? ` (${user.username})` : ""}:</h2>

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
                {content}
            </div>
        </>
    )
}