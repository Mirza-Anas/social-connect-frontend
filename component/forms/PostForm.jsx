const PostForm = ({ content, setContent, postSubmit, handleImage }) => {
    return (
        <div className="post-form">
            <label>
                <div className="post-form-img-div">
                    <h3>Post Image</h3>
                    <h5 id="post-form-image-name">Your File</h5>
                    <img src="/images/upload.png" alt="upload-image" />
                </div>
            <input onChange={handleImage} className="post-form-img" type="file" accept="image/*"hidden />
            </label>
            <img id="post-form-preview-image" src="" alt="" />
            <textarea
                value={content}
                className="post-form-content"
                placeholder="Write Something....."
                cols="30"
                rows="5"
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="post-form-button-div">
                <button disabled={!content} onClick={postSubmit}>Post</button>
            </div>
        </div>
    );
};

export default PostForm;
