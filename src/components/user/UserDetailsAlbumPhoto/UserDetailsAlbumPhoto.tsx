import { Photo } from "./types";
import styles from "./UserDetailsAlbumPhoto.module.css"

export default function UserDetailsAlbumPhoto({photo}: {photo: Photo}) {
    return (
        <li className={styles["user-details-album-photo"]}>
            <img className={styles["user-details-album-photo-img"]} src={photo.thumbnailUrl} alt="No Found" />
            <div className={styles["user-details-album-photo-title"]}>{photo.title}</div>
        </li>
    )
}