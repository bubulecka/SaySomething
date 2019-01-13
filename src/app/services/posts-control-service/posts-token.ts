export interface PostsToken {
    "auth": boolean,
    "response": boolean,
    "data": Array<
        {
            "post_id": number,
            "creator_id": number,
            "likes": number,
            "img_link": string | null,
            "content": string,
            "edited": Date,
            "created": Date,
            "creator_name": string,
            "creator_logo": "string" | null
        }
    >
}
