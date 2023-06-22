import { ApiErrorComponent } from "../../../components/error/ApiError";
import { RootState } from "../../store";

export const selectApiErrorsByComponent = (state: RootState, errorComponent: ApiErrorComponent) => {
    return Object.values(state.api_errors.errors).filter(error => error.errorComponent === errorComponent);
};