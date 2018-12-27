export interface PostsByToken {
    "response": boolean,
    "data": {
        "creator_name": string,
        "creator_logo": "string" | null,
        "posts": Array<
            {
                "post_id": number,
                "creator_id": number,
                "likes": number,
                "img_link": string,
                "content": string,
                "edited": Date,
                "created": Date
            }
        >
    }
}
