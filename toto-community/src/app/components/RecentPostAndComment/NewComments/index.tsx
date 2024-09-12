import Link from "next/link";

const NewComments = ({comments}: {comments: any}) => {

    return (
        <ul className="text-sm space-y-2">
          {comments && comments.slice(0, 5).map((comment: any) => (
            <li key={comment.id} className="flex justify-between">
              <Link href={`/community/${comment.post.id}`}>
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[댓글]</span> 
                  <span className="text-black ml-1 truncate">{comment.content}</span>
                </div>
              </Link>
              <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
    )
}

export default NewComments;