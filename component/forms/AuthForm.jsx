"use client";
import Link from "next/link";

const AuthForm = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    rePass,
    setRePass,
    setQuestion,
    answer,
    setAnswer,
    loading,
    handleSubmit,
    userId,
    setUserId,
    about,
    setAbout,
    page,
}) => {
    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                {((page !== "login" && page!=="forget") || page === "update") && (
                    <input
                        type="text"
                        value={username}
                        name="register_name"
                        id="register_name"
                        placeholder="Your Name"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                {page ==="update" &&<>
                <br />
                <input
                        type="text"
                        value={userId}
                        name="User-ID"
                        id="update_Id"
                        placeholder="Enter User ID"
                        onChange={(e) => setUserId(e.target.value)}
                />
                <br />
                <input
                        type="text"
                        value={about}
                        name="User-about"
                        id="update_about"
                        placeholder="Write About Yourself"
                        onChange={(e) => setAbout(e.target.value)}
                />
                </>}
                <br />
                <input
                    type="email"
                    value={email}
                    name="register_email"
                    id="register_email"
                    placeholder="Your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled = {page==="update"}
                />
                { (page !=="update") &&
                <>
                <br />
                <input
                    type="password"
                    value={password}
                    name="register_password"
                    id="register_password"
                    placeholder={page==="forget"? "New Password":"Enter Password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </>}
                <br />
                {page==="forget" && page !=="update" && <><input
                    type="password"
                    value={rePass}
                    name="re-enter-password"
                    id="re-enter-password"
                    placeholder="Re-enter Password"
                    onChange={(e) => setRePass(e.target.value)}
                />
                <br /></>}
                {page !== "login" && (
                    <select
                        name="register_question"
                        id="register_question"
                        onChange={(e) => setQuestion(e.target.value)}
                    >
                        <option>What's your favourite color?</option>
                        <option>What's your school name?</option>
                        <option>What's your first pet name?</option>
                    </select>
                )}
                <br />
                {page !== "login" && page!=="forget" &&
                    <><small>you can use this to reset your password later</small>
                <br /></>}
                {page !== "login" && (
                    <input
                        type="text"
                        value={answer}
                        id="register_answer"
                        placeholder="Your answer"
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                )}
                <br />
                <button
                    disabled={
                        page==="forget"? !email || !password || !rePass || !answer:
                        page === "login"
                            ? !email || !password
                            :page === "update"?  false : !username || !email || !password || !answer
                    }
                >
                    {loading ? (
                        <img src="/images/loading.png" alt="loading" />
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
            {page !=="forget" && page!=="update" && <p className="already-registered">
                {page === "login"
                    ? "Not yet Registered? "
                    : "Already Registered? "}
                <Link href={page === "login" ? "/register" : "/login"}>
                    {page === "login" ? "Register" : "login"}
                </Link>
            </p>}
            {page ==="login" && <div className="forgot-password-link"><Link href={"/forget-password"}>Forgot Password?</Link></div>}
        </div>
    );
};

export default AuthForm;
