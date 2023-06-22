import { useAppDispatch } from "../../redux/hooks"
import styles from './ApiError.module.css'
import { ApiErrorData, apiErrorClosed } from "../../redux/modules/apiSlice"

export default function ApiError({errorId, errorText} : ApiErrorData) {
    const dispatch = useAppDispatch()

    return (
        <div className={styles["api-error"]}>
            <p><b>API error text:</b><br />{errorText}</p>
            <div className={styles["api-error-close-btn"]} onClick={() => dispatch(apiErrorClosed(errorId))}></div>
        </div>
    )
}