"use client";
import { useContext } from "react";
import moment from "moment";
import { UserContext } from "../../context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Post = ({
    post,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    addComment,
    deleteComment,
    commentsCount = 2,
}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();
    return (
        post &&
        post.postedBy && (
            <div className="dashboard-main-userpost" key={post._id}>
                <div className="dashboard-userpost-header">
                    <div>
                        {post.postedBy.image && post.postedBy.image.url ? (
                            <img src={post.postedBy.image.url} />
                        ) : (
                            post.postedBy.username[0]
                        )}
                    </div>
                    <h3 className="dashboard-main-up-name">
                        {post.postedBy.username}
                    </h3>
                    <h5>{moment(post.createdAt).fromNow()}</h5>
                </div>
                {post.image && (
                    <img
                        className="dashboard-post-image"
                        src={post.image.url}
                        alt="posted_image"
                    />
                )}
                <div className="dashboard-post-likes-div">
                    {state &&
                    state.user &&
                    post.likes.includes(state.user._id) ? (
                        <img
                            onClick={() => handleUnlike(post._id)}
                            src="/images/heartFilled.png"
                            alt=""
                        />
                    ) : (
                        <img
                            onClick={() => handleLike(post._id)}
                            src="/images/heart.png"
                            alt=""
                        />
                    )}
                    <p>{post.likes.length}</p>
                    <div className="post-comment-link">
                        <img
                            onClick={() => handleComment(post)}
                            src="/images/comment.png"
                            alt=""
                        />
                        <Link href={`/post/${post._id}`}>
                            <p>{post.comments.length} Comments</p>
                        </Link>
                    </div>
                    {post.postedBy._id === state?.user._id && (
                        <div className="dashboard-post-edit-delete-div">
                            <img
                                src="/images/edit-document.png"
                                alt="edit post"
                                onClick={() =>
                                    router.push(`/user/post/${post._id}`)
                                }
                            />
                            <img
                                src="/images/delete_post.png"
                                alt="delete post"
                                onClick={() => handleDelete(post._id)}
                            />
                        </div>
                    )}
                </div>
                <p className="dashboard-post-content">{post.content}</p>
                {post.comments &&
                    post.comments.length > 0 &&
                    post.comments.slice(0, commentsCount).map((c) => (
                        <div className="post-below-comments" key={c._id}>
                            <div className="post-below-image">
                                <div>
                                    {c.postedBy.image &&
                                    c.postedBy.image.url ? (
                                        <img src={c.postedBy.image.url} />
                                    ) : (
                                        c.postedBy.username[0]
                                    )}
                                </div>
                            </div>
                            <div className="post-below-comment-main">
                                <div className="post-below-comment-username">
                                    <p>{c.postedBy.username}</p>
                                    <div className="post-below-comment-date">
                                        {moment(c.created).fromNow()}
                                    </div>
                                </div>
                                <div className="post-below-comment-text">
                                    {c.text}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        )
    );
};

export default Post;
