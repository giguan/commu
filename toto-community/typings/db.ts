export interface Post {
    author: any;
    board: any;
    id: number;
    category: string;
    title: string;
    views: number;
    likes: number;
    dislikes: number;
    date: string;
    createdAt: Date;
    content: string;
    level: number;
    commentCount: number;
}

export interface Comment {
    id: number;
    content: string;
    like: number;
    dislike: number;
    createdAt: Date;
    updatedAt: Date;

}