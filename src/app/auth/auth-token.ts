export interface AuthToken {
    "auth": boolean,
    "message": string,
    "items"?: Array<
    {
        "img_link": string,
        "realname": string,
        "edited": Date,
        "created": Date
    }>
}
