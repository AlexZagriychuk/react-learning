import { Photo } from "../../../redux/modules/photosSlice";

export default function UserAlbumPhoto({photo}: {photo: Photo}) {
    return (
        <li className="user-details-album-photo">
            <img className="user-details-album-photo-img" src={photo.thumbnailUrl} alt="No Found" />
            <div className="user-details-album-photo-title">{photo.title}</div>
        </li>
    )
}