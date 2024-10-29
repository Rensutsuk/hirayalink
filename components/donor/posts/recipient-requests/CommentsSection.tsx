const CommentsSection = ({ post, newComment, setNewComment, handleAddComment }: { 
  post: {
    id: string;
    comments: Array<{
      id: string;
      content: string; 
      userId: string;
    }>;
  };
  newComment: Record<string, string>;
  setNewComment: (value: Record<string, string>) => void;
  handleAddComment: (postId: string) => void;
}) => {
  return (
    <div className="w-full ml-4 border-l pl-4 max-h-96 overflow-y-auto">
      <h4 className="font-bold mb-2">Comments</h4>
      <div className="space-y-2">
        {post.comments.map((comment: { id: string; content: string; userId: string }) => (
          <p key={comment.id} className="text-sm bg-gray-200 p-2 rounded">
            {comment.content}
          </p>
        ))}
      </div>
      <div className="mt-2 sticky bottom-0 bg-white py-2">
        <input
          type="text"
          value={newComment[post.id] || ""}
          onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
          placeholder="Add a comment..."
          className="input input-bordered w-full"
        />
        <div
          role="button"
          onClick={() => handleAddComment(post.id)}
          className="btn btn-primary w-full text-white mt-2"
        >
          Add Comment
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
