import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUserId } from "../../redux/modules/usersSlice";
import { User } from "../user/users";
import { Post } from "./posts";

export default function PostsListItem(props: {post: Post, user: User}) {
    const currentUserId = useAppSelector(selectCurrentUserId)

    const getDateStrEnding = (dateMemberValue: number) => {
        return dateMemberValue === 1 ? "" : "s"
    }

    const dateDiffAsString = (date1: Date, date2 : Date = new Date()) => {
        const diffInMinutesTotal = Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 60000))
        const diffInHoursTotal = Math.floor(diffInMinutesTotal / 60)
        const diffInDaysTotal = Math.floor(diffInHoursTotal / 24)

        if(diffInMinutesTotal < 60) {
            return `${diffInMinutesTotal} minute${getDateStrEnding(diffInMinutesTotal)}`
        }

        if(diffInHoursTotal < 24) {
            const minutes = Math.floor(diffInMinutesTotal - diffInHoursTotal * 60)
            return `${diffInHoursTotal} hour${getDateStrEnding(diffInHoursTotal)}, ${minutes} minute${getDateStrEnding(minutes)}`
        }

        const hours = Math.floor(diffInHoursTotal - diffInDaysTotal * 24)
        return `${diffInDaysTotal} day${getDateStrEnding(diffInDaysTotal)}, ${hours} hour${getDateStrEnding(hours)}`
    }

    return (
        <li className={currentUserId === props.post.userId ? "posted-by-current-user" : ""}>
            <div className="post-user-data">
                <img src={props.user.avatar} alt="" className="post-user-img" />
                <span className="post-user-name">{props.user.name}</span>
                <span className="post-user-type">({props.user.type})</span>
                <span className="post-user-registered">Registered:<br/>{props.user.registered}</span>
            </div>

            <div className="post-content">
                <h3 className="post-content-title">{props.post.title}</h3>
                <div className="post-content-post">{props.post.post}</div>
            </div>

            <div className="post-date">
                <i>Posted:</i>
                <br/>
                {props.post.date}
                <br/>
                <span>({dateDiffAsString(new Date(props.post.date))} ago)</span>
            </div>
        </li>
    )
}
