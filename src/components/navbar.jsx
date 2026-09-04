import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="relative z-[9999] bg-[#06030e] text-white">

            <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/" className="text-2xl font-bold">
                    Protonic Labs
                </Link>

                {/* Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-[10000] md:hidden text-3xl"
                >
                    ☰
                </button>

                {/* Navigation */}
                <div
                    className={`
                        ${isOpen ? "flex" : "hidden"}
                        md:flex
                        flex-col md:flex-row
                        items-center
                        gap-6
                        absolute md:static
                        top-full left-0
                        w-full md:w-auto
                        bg-[#06030e]
                        z-[9999]
                    `}
                >

                    <ul className="flex flex-col md:flex-row gap-6 p-6 md:p-0">

                        <li>
                            <Link to="/">Account</Link>
                        </li>

                        <li>
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>

                        <li>
                            <Link to="/Calculator">Calculator</Link>
                        </li>

                        <li>
                            <Link to="/Products">Products</Link>
                        </li>

                    </ul>

                    <div
                        className={`
                            ${isOpen ? "w-full" : "w-24"}
                            bg-[#fefeff]
                            m-[10px]
                            flex
                            justify-center
                            rounded-[13px]
                        `}
                    >
                        <button
                            onClick={() => navigate("/login")}
                            className="
                                w-full
                                text-[#040105]
                                rounded-[13px]
                                text-center
                                font-mono
                                hover:bg-[#0e0a3d]
                                hover:text-[#f9f9fe]
                                hover:scale-105
                                transition
                                duration-300
                            "
                        >
                            Login
                        </button>
                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;