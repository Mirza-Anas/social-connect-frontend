"use client";
import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/navigation";

const PeopleComp = ({ people, handleFollow }) => {
    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        people &&
        people.map((person) => {
            return (
                <div className="follow-bar" key={person._id}>
                    <div className="follow-bar-image-div">
                        {person.image ? (
                            <img src={person.image.url} alt="" />
                        ) : (
                            person.username[0]
                        )}
                    </div>
                    <div className="follow-bar-name">{person.username}</div>
                    <div className="follow-bar-follow" onClick={() => handleFollow(person)}>follow</div>
                </div>
            );
        })
    );
};

export default PeopleComp;
