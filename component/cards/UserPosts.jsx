"use client";
import { useContext } from "react";
import moment from "moment";
import { UserContext } from "../../context";
import { useRouter } from "next/navigation";
import Post from "./Post";

const UserPosts = ({
    posts,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    addComment,
}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();
    return (
        posts &&
        posts.map((post) => {
            return (
                <Post post = {post}
                handleDelete = {handleDelete}
                handleLike = {handleLike}
                handleUnlike = {handleUnlike}
                handleComment = {handleComment}
                addComment = {addComment}
                key={post._id}
                />
            );
        })
    );
};

export default UserPosts;
