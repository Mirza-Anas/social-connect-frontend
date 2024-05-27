"use client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import UserRoute from "../../../../component/routes/UserRoute";
import { UserContext } from "../../../../context";
import PostForm from "../../../../component/forms/PostForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
    const path = useParams();
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
    const [imageDetails, setImageDetails] = useState("");
    const [image, setImage] = useState({});
    const [state] = useContext(UserContext);
    const [isImageUpdated, setIsImageUpdated] = useState(false);

    const router = useRouter();

    const fetchEditPost = async () => {
        try {
            const { data } = await axios.get(`/user-post/${path._id}`);
            setPost(data);
            setContent(data.content);
            if (data.image) setImage(data.image);
        } catch (err) {
            console.log(err);
        }
    };

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

    useEffect(() => {
        if (path._id && state && state.token) fetchEditPost();
    }, [path._id, state && state.token]);

    useEffect(() => {
        const preview = document.getElementById("post-form-preview-image");
        if (preview) preview.src = image?.url;
    }, [image]);

    const postSubmit = async (e) => {
        e.preventDefault();
        let dummyImage = "";

        if (isImageUpdated) {
            dummyImage = await uploadPost();
        } else if (Object.keys(image).length) {
            dummyImage = image;
        }

        try {
            const { data } = await axios.put(
                `/update-post/${path._id}`,
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
                toast.success("post updated successfully");
                setContent("");
                router.push("/user/dashboard");
            }
        } catch (err) {
            console.error(err);
        }
        setImage({});
        document.getElementById("post-form-image-name").innerHTML = "Your File";
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const preview = document.getElementById("post-form-preview-image");
        reader.onload = (e) => (preview.src = e.target.result);
        reader.readAsDataURL(file);
        setIsImageUpdated((prev) => !prev);
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

    return (
        <UserRoute>
            <div className="dashboard-header">Edit Your Post</div>
            <div className="dashboard">
                <div className="dashboard-sidebar">Sidebar</div>
                <div className="dashboard-main">
                    <PostForm
                        content={content}
                        setContent={setContent}
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                    />
                </div>
            </div>
        </UserRoute>
    );
};

export default page;
