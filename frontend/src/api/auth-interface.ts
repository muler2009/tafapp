export interface AuthState {
    username?: null;
    isAuthenticated: string | boolean;
    token: string | null;
    refresh: string | null;
    csrftoken: null;
    full_name: string | null;
}

export interface GetUserGroupAPIinterface {
    groups: string | null;
}