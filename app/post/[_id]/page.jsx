"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Post from "../../../component/cards/Post";

const PostComments = () => {
    const path = useParams();
    const _id = path._id;

    const [post, setPost] = useState({});

    useEffect(() => {
        if (_id) fetchPosts();
    }, [_id]);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="comments-page">
            <Post post={post} commentsCount={100} />
        </div>
    );
};

export default PostComments;
