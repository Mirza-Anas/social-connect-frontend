"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterSuccess from "../../component/RegisterSuccess";
import AuthForm from "../../component/forms/AuthForm";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("What's your favourite color?");
    const [answer, setAnswer] = useState("");
    const [newPass, setNewPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(UserContext);

    const router = useRouter();
    if (state && state.token) router.push("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`/forgot-password`, {
                email,
                newPass,
                rePass,
                question,
                answer,
            });
            setOk(data.ok);
            setAnswer("");
            setEmail("");
            setNewPass("");
            setRePass("");
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <RegisterSuccess ok={ok} setOk={setOk} 
                page = "forget"
            />
            <div className="register-heading">Reset Password</div>
            <AuthForm
                email={email}
                setEmail={setEmail}
                password={newPass}
                setPassword={setNewPass}
                rePass={rePass}
                setRePass={setRePass}
                setQuestion={setQuestion}
                answer={answer}
                setAnswer={setAnswer}
                loading={loading}
                handleSubmit={handleSubmit}
                page="forget"
            />
        </div>
    );
};

export default ForgetPassword;
