"use client"
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });
    const router = useRouter();

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")));
    }, []);

    
    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            let res = err.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                setState({
                    user: {},
                    token:"",
                });
                window.localStorage.removeItem("auth");
                router.push("/login");
            }
            return Promise.reject(err);
        }
    )
    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
