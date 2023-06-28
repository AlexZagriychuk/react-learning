import { useAppDispatch } from "../../../redux/hooks"
import styles from "./ApiError.module.css"
import { apiErrorClosed } from "../../../redux/modules/common_api"
import { ApiErrorData } from "./types"

export default function ApiError({errorId, errorText} : ApiErrorData) {
    const dispatch = useAppDispatch()

    return (
        <div className={styles["api-error"]}>
            <p><b>API error text:</b><br />{errorText}</p>
            <div className={styles["api-error-close-btn"]} onClick={() => dispatch(apiErrorClosed(errorId))}></div>
        </div>
    )
}