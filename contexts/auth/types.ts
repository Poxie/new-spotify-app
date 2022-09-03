export type AuthContext = {
    get: (query: string, external?: boolean) => Promise<any>;
}