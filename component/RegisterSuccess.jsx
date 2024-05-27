"use client"
import Link from "next/link";
const RegisterSuccess = ({ ok, setOk , page}) => {
    const handleClick = () => {
        setOk(false);
    };
    return (
        ok && (
            <div className="register-success-banner">
                <div className="rsb-upper">
                    <h3>Congratulations!</h3>
                    <img
                        src="/images/delete.png"
                        alt="cancel"
                        onClick={handleClick}
                        className="close-icon"
                    />
                </div>
                <div className="rsb-middle">
                    <p>{page==="forget" ?"You have successfully reset your password" :"You have successfully Registered."}</p>
                </div>
                <button className="rsb-button">
                    <Link href="/login">Login</Link>
                </button>
            </div>
        )
    );
};

export default RegisterSuccess;
