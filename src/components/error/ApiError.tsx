import { useAppDispatch } from "../../redux/hooks"
import './ApiError.css'
import { ApiErrorData, apiErrorClosed } from "../../redux/modules/apiSlice"

export default function ApiError({errorId, errorText} : ApiErrorData) {
    const dispatch = useAppDispatch()

    return (
        <div className="api-error">
            <p><b>API error text:</b><br />{errorText}</p>
            <div id="api-error-close-btn" onClick={() => dispatch(apiErrorClosed(errorId))}></div>
        </div>
    )
}