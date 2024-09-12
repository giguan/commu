import Link from "next/link";
import { Post } from "../../../../../typings/db";
import { format } from "date-fns";

const NewPosts =  ({posts}: {posts: Post[]}) => {

    return (
        <ul className="text-sm space-y-2">
            {posts && posts.slice(0,5).map((post: Post) => (
                <li key={post.id} className="flex justify-between">
                    <Link href={`/community/${post.id}`}>
                        <div className="flex items-center whitespace-nowrap max-w-[75%]">
                            <span className="text-red-500 font-semibold">[{post.board.name}]</span> 
                            <span className="text-black ml-1 truncate">{post.title}</span>
                        </div>
                    </Link>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</span>
                </li>
            ))}
        </ul>
    )
}

export default NewPosts;