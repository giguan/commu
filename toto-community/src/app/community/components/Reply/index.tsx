import ReplyForm from "../ReplyForm"
import ReplyList from "../ReplyList"

const Reply = ({postId}: {postId: number}) => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">댓글</h2>
            <ReplyList postId={postId}/>
            <ReplyForm postId={postId}/>
            
        </div>
    )
}

export default Reply;