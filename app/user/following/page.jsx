"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Following = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get("user-following");
            setPeople(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (state && state.token) fetchFollowing();
    }, [state && state.token]);

    const handleUnFollow = async user => {
        try {
            const {data} = await axios.put("/user-unfollow", {_id : user._id});
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
            toast.error(`You Unfollowed ${user.username}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        people &&
        people.map((person) => {
            return (
                <div className="following-page">
                    <div className="follow-bar" key={person._id}>
                        <div className="follow-bar-image-div">
                            {person.image ? (
                                <img src={person.image.url} alt="" />
                            ) : (
                                person.username[0]
                            )}
                        </div>
                        <div className="follow-bar-name">{person.username}</div>
                        <div
                            className="follow-bar-follow"
                            onClick={() => handleUnFollow(person)}
                        >
                            Unfollow
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default Following;
