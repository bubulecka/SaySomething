export interface AuthToken {
    "auth": boolean,
    "message": string,
    "profile"?:
    {
        "username": string,
        "img_link": string,
        "created": Date
    }
}
