import Link from "next/link";

function Page() {
    return (
        <div className="home">
            <h3 className="home-welcome">Welcome to</h3>
            <h1 className="home-name">Social Connect</h1>
            <div className="home-button">
                <Link href="/login">
                    <button className="home-login">Login</button>
                </Link>
                <Link href="/register">
                    <button className="home-register">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Page;
