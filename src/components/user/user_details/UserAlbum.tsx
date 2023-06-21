import { useGetPhotosByAlbumIdQuery } from "../../../redux/modules/photosSlice";
import UserAlbumPhoto from "./UserAlbumPhoto";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from "react";

export default function UserAlbum({albumId, albumTitle}: {albumId: number, albumTitle: string}) {
    const {data: photos, isError, error, isLoading} = useGetPhotosByAlbumIdQuery(albumId)
    const [albumOpened, setAlbumOpened] = useState(false)

    const btnIcon = albumOpened ? icon({name: "folder-minus"}) : icon({name: "folder-plus"})

    // Showing any content (apart from the album title) only if the album is opened
    // Album photos will also be downloaded only after the album is opened
    let content
    if (albumOpened) {
        if (isError) {
            content = "An error has occurred: " + error
        } else if (isLoading) {
            content = <p>Loading...</p>
        } else if (photos === undefined || photos.length === 0) {
            content = <p>No photos available for this album</p>
        } else if (photos) {
            content = (
                <ul className="user-details-album-photos">
                    {photos.map(photo => <UserAlbumPhoto key={photo.id} photo={photo} />)}
                </ul>
            )
        }
    }

    return (
        <li className="user-details-album">
            <h4 className="user-details-album-title">
                Album: {albumTitle}
                <FontAwesomeIcon className="user-details-album-btn" icon={btnIcon} onClick={() => setAlbumOpened(!albumOpened)} />
            </h4>
            {content}
        </li>
    )
}