import { useGetAlbumsByUserIdQuery } from "../../../redux/modules/usersSlice"
import { User } from "../users"
import UserAlbum from "./UserAlbum"

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
        content = <ul className="user-details-albums">{albums.map(album => 
            <UserAlbum key={album.id} albumId={album.id} albumTitle={album.title} /> 
        )}</ul>
    }

    return (
        <>
            {content}
        </>
    )
}