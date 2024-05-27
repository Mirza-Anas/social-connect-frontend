const CommentForm = ({comment, setComment, addComment}) => {
    return (
        <form className="comment-form" onSubmit={(e) => addComment(e)}>
            <input
                type="text"
                className="comment-input-text"
                placeholder="write somthing..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="comment-form-button">Post</button>
        </form>
    );
};

export default CommentForm;
