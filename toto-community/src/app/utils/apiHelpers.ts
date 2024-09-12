import axios from "axios";

export const fetchUserReaction = async (postId: number, userId: string) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/reaction/status`, {
        params: {
        postId,
        userId,
        },
    });
    return data; // { reactionType: 'like' | 'dislike' | null }
};