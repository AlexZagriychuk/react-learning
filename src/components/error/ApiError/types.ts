export enum ApiErrorComponent {
    TODOS,
    POSTS,
    USERS
}

export interface ApiErrorData {
    errorId: number;
    errorComponent: ApiErrorComponent;
    errorText: string;
}
