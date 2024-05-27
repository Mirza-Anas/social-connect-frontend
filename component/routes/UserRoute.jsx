"use client"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context";
import { useRouter } from "next/navigation";

const UserRoute = ({ children }) => {
    const [ok, setOk] = useState(false);
    const [state] = useContext(UserContext);
    const router = useRouter();

    const userPermit = async () => {
        await axios
            .get(`/current-user`)
            .then(({ data }) => {
                if (data.ok) setOk(true);
            })
            .catch((err) => {
                router.push("/login");
            });
    };
    useEffect(() => {
        if (state && state.token) userPermit();
        else {
            const authData = localStorage.getItem("auth");
            if (!authData) router.push("/login");
        }
    }, [state && state.token]);

    return ok ? (
        <>{children}</>
    ) : (
        <div className="user-router">
            <img src="/images/loading.png" alt="loading" />
        </div>
    );
};

export default UserRoute;
