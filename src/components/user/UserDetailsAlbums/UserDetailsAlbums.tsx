import { useGetAlbumsByUserIdQuery } from "../../../redux/modules/users"
import { User } from "../userTypes"
import UserDetailsAlbum from "../UserDetailsAlbum/UserDetailsAlbum"
import styles from "./UserDetailsAlbums.module.css"

export default function UserDetailsAlbums({user}: {user: User}) {
    const {data: albums, isLoading, isError, error} = useGetAlbumsByUserIdQuery(user.id) 

    let content
    if (isError) {
        content = <div>{error.toString()}</div>
    } else if (isLoading) {
        content = <div>Loading...</div>
    } else if (albums === undefined || albums.length === 0) {
        content = <p>No albums available for this user</p>
    } else {
        content = <ul className={styles["user-details-albums"]}>{albums.map(album => 
            <UserDetailsAlbum key={album.id} albumId={album.id} albumTitle={album.title} /> 
        )}</ul>
    }

    return (
        <>
            {content}
        </>
    )
}