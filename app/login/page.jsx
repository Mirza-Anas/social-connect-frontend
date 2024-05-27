"use client";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "../../component/forms/AuthForm";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `/login`,
                {
                    email,
                    password,
                }
            );
            setLoading(false);

            // updating context state
            setState((prev) => ({
                ...prev,
                user: data.user,
                token: data.token,
            }));
            
            // saving token in local storage
            window.localStorage.setItem("auth", JSON.stringify(data));
            router.push("/user/dashboard");
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    // if (state && state.token) router.push("/");
    useEffect(() => {
        // Redirect if the user is already logged in
        if (state && state.token) {
            router.push("/user/dashboard");
        }
    }, [state, router]);

    return (
        <div className="register">
            <div className="register-heading">Login</div>
            <AuthForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                handleSubmit={handleSubmit}
                page="login"
            />
        </div>
    );
};

export default Login;
