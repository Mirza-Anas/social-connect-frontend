"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "../../../../component/forms/AuthForm";
import { UserContext } from "../../../../context";
import UserRoute from "../../../../component/routes/UserRoute";

const ProfileUpdate = () => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("What's your favourite color?");
    const [answer, setAnswer] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageDetails, setImageDetails] = useState("");
    const [newImage, setNewImage] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/drvxzp3vv/image/upload/v1707923076/iq70hpcyentvbcvzjiju.png")

    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        if (state && state.user) {
            setUsername(state.user.username);
            setUserId(state.user.userId);
            setEmail(state.user.email);
            setAbout(state.user.about);
            if (state.user.image) {
                setImageUrl(state.user.image.url);
            }
        }
    }, [state && state.user, typeof window]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let dummyImage = "";
        if (imageDetails && newImage) {
            dummyImage = await uploadPost();
            setNewImage(prev => !prev)
        }

        try {
            const { data } = await axios.put(`/profile-update`, {
                username,
                question,
                answer,
                about,
                userId,
                image:dummyImage ,
            });
            console.log(data);
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            setOk(true);
            setLoading(false);
            toast.success("Profile Updated Successfully");
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const preview = document.getElementById("profile-image");
        reader.onload = (e) => (preview.src = e.target.result);
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append("image", file);
        setImageDetails(formData);
        setNewImage(true);
    };

    return (
        <UserRoute>
            <div className="register">
                <div className="register-heading">Update Profile</div>
                <div className="upload-profile-picture">
                    <label>
                        <div className="profile-picture">
                            <img
                                id="profile-image"
                                src={imageUrl}
                                alt="sakdfj"
                            />
                        </div>
                        <input
                            onChange={handleImage}
                            className="post-form-img"
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </label>
                </div>
                <AuthForm
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    setQuestion={setQuestion}
                    answer={answer}
                    setAnswer={setAnswer}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    about={about}
                    setAbout={setAbout}
                    userId={userId}
                    setUserId={setUserId}
                    page="update"
                />
            </div>
        </UserRoute>
    );
};

export default ProfileUpdate;
