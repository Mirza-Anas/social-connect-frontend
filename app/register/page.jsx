"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterSuccess from "../../component/RegisterSuccess";
import AuthForm from "../../component/forms/AuthForm";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context";
import { nanoid } from "nanoid";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [question, setQuestion] = useState("What's your favourite color?");
    const [answer, setAnswer] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(UserContext);

    const router = useRouter();
    if (state && state.token) router.push("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = nanoid(10);
            console.log(userId);
            const { data } = await axios.post(`/register`, {
                username,
                email,
                password,
                question,
                answer,
                userId,
            });
            setOk(data.ok);
            setAnswer("");
            setEmail("");
            setUsername("");
            setPassword("");
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <RegisterSuccess ok={ok} setOk={setOk} page="register"/>
            <div className="register-heading">Regsiter</div>
            <AuthForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setQuestion={setQuestion}
                answer={answer}
                setAnswer={setAnswer}
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Register;
