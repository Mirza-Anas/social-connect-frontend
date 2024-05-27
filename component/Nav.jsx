"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
    const [current, setCurrent] = useState("");
    const [state, setState] = useContext(UserContext);
    const [dropdown, setDropdown] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    if (typeof document !== "undefined") {
        const dropdownVsiibility = document.getElementById("dropdown-vis");
        if(dropdownVsiibility) {
        dropdownVsiibility.style.display = "none";
    }}

    useEffect(() => {
        const dropdownVsiibility = document.getElementById("dropdown-vis2");
        const dropIcon = document.getElementById("drop-icon-rotate");
        if(dropdown && dropdownVsiibility){
        dropdownVsiibility.style.display = "flex";
        dropIcon.style.transform = "rotate(180deg)";
        } else if(dropdownVsiibility) {
        dropdownVsiibility.style.display = "none";
        dropIcon.style.transform = "rotate(0deg)";
        }
    },[dropdown,router])

    useEffect(() => {
        setCurrent(pathname);
    }, [pathname]);

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        setDropdown((prev) => !prev)
        router.push("/login");
    };
    return (
        <div className="navigation">
            <Link href="/" className={`nav ${pathname==="/"?"active":""}`}>
                Home
            </Link>
            {state === null ? (
                <>
                    <Link href="/login" className={`nav ${pathname==="/login"?"active":""}`}>
                        Login
                    </Link>
                    <Link href="/register" className={`nav ${pathname==="/register"?"active":""}`}>
                        Register
                    </Link>
                </>
            ) : (
                <>
                    <div className="dropdown">
                        <div className="dropdown-head" onClick={() => {setDropdown((prev) => !prev)}}>
                        <h3 className="dropdown-name">
                                {state && state.user && state.user.username}
                        </h3>
                        <img id="drop-icon-rotate" src="/images/down.png" alt="drop-icon" />
                        </div>
                        
                        <ul id="dropdown-vis2" className="dropdown-ul" >
                            <li onClick={() => {setDropdown((prev) => !prev)}}><Link href="/user/dashboard" className={`nav ${pathname==="/user/dashboard"?"active":""}`}>
                                Dashboard
                            </Link></li>
                            <li ><a onClick={logout} className={pathname==="/login"?"active":""}>Logout</a></li>
                            <li onClick={() => {setDropdown((prev) => !prev)}}><Link href="/user/profile/update" className={`nav ${pathname==="/user/profile/update"?"active":""}`}>
                                Profile Update
                            </Link></li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Nav;
