"use client";
import UserRoute from "../../../component/routes/UserRoute";
import { useState, useEffect, useContext } from "react";
import PostForm from "../../../component/forms/PostForm";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../context";
import UserPosts from "../../../component/cards/UserPosts";
import PeopleComp from "../../../component/cards/PeopleComp";
import Link from "next/link";
import { Modal } from "antd";
import CommentForm from "../../../component/forms/CommentForm";
import Search from "../../../component/Search";

const page = () => {
    const [state, setState] = useContext(UserContext);

    const [content, setContent] = useState("");
    const [imageDetails, setImageDetails] = useState("");
    const [image, setImage] = useState(false);
    const [posts, setPosts] = useState([]);
    const [people, setPeople] = useState([]);

    // comments related
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [currentPost, setCurrentPost] = useState({});

    const fetchUserPosts = async () => {
        try {
            const { data } = await axios.get("/user-posts");
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const findPeople = async () => {
        const { data } = await axios.get("find-people");
        setPeople(data);
    };

    useEffect(() => {
        if (state && state.token) {
            fetchUserPosts();
            findPeople();
        }
    }, [state && state.token, image]);

    const uploadPost = async () => {
        try {
            const { data } = await axios.post("/upload-image", imageDetails);
            setImageDetails("");
            return {
                url: data.url,
                public_id: data.public_id,
            };
        } catch (err) {
            toast.error("error uploading image");
            setImageDetails("");
            return console.log(err);
        }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        let dummyImage = "";
        if (imageDetails) {
            dummyImage = await uploadPost();
        }

        try {
            const { data } = await axios.post(
                "/create-post",
                dummyImage
                    ? {
                          content,
                          image: dummyImage,
                      }
                    : {
                          content,
                      }
            );

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("post created successfully");
                setContent("");
                const preview = document.getElementById(
                    "post-form-preview-image"
                );
                preview.src = "";
                fetchUserPosts();
            }
        } catch (err) {
            console.error(err);
        }
        setImage((prev) => !prev);
        document.getElementById("post-form-image-name").innerHTML = "Your File";
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const preview = document.getElementById("post-form-preview-image");
        const reader = new FileReader();
        reader.onload = (e) => (preview.src = e.target.result);
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append("image", file);
        formData.append("content", content);
        setImageDetails(formData);
        const fileDetails = [...formData];
        const fileName = fileDetails[0][1]?.name;
        if (fileName)
            document.getElementById("post-form-image-name").innerHTML =
                fileDetails[0][1].name;
    };

    const handleDelete = async (postId) => {
        try {
            const answer = window.confirm(
                "Are you sure you want to delete this Post?"
            );
            if (!answer) return;
            const { data } = await axios.delete(`/delete-post/${postId}`);
            toast.error("Post deleted");
            fetchUserPosts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollow = async (user) => {
        try {
            const { data } = await axios.put("/user-follow", { _id: user._id });

            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
            toast.success(`You Started Following ${user.username}`);
            fetchUserPosts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async (_id) => {
        try {
            const { data } = await axios.put("/handle-like", { _id });
            fetchUserPosts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async (_id) => {
        try {
            const { data } = await axios.put("/handle-unlike", { _id });
            fetchUserPosts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleComment = (post) => {
        setCurrentPost(post);
        setVisible((prev) => !prev);
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/add-comment", {
                postId: currentPost._id,
                comment,
            });
            console.log(data);
            setComment("")
            setVisible(prev => !prev)
            fetchUserPosts();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserRoute>
            <div className="dashboard-header">Dashboard</div>
            <div className="dashboard">
                <div className="dashboard-sidebar">
                    <Search/>
                    {state && state.user && state.user.following && (
                        <div className="dashboard-following-count">
                            <Link href="/user/following">
                                {`${state.user.following.length} following`}
                            </Link>
                        </div>
                    )}
                    <PeopleComp people={people} handleFollow={handleFollow} />
                </div>
                <div className="dashboard-main">
                    <PostForm
                        content={content}
                        setContent={setContent}
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                    />
                    <UserPosts
                        posts={posts}
                        handleDelete={handleDelete}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleComment={handleComment}
                        addComment={addComment}
                    />
                </div>
                <Modal
                    open={visible}
                    onCancel={() => setVisible(false)}
                    title="Comment"
                    footer={null}
                >
                    <CommentForm
                        comment={comment}
                        setComment={setComment}
                        addComment={addComment}
                    />
                </Modal>
            </div>
        </UserRoute>
    );
};

export default page;
