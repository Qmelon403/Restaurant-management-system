import { Link, useNavigate } from "react-router-dom"
import Ferrofluid from "../assets/Ferrofluid"
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [status, setstatus] = useState();
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email,
                password: password,
                status: status
            })
        });
        const data = await response.json();
        if (data.success === true) {
            navigate("/Dashboard");
        }
        else {
            seterror(data.message);
        };
    };
    return (

        <div className="relative min-h-screen isolate ">
            {/* background layer, pinned behind everything */}
            <div className="absolute inset-0 -z-10 bg-slate-950">
                <Ferrofluid
                    colors={["#8c820d", "#5d38d7", "#457a96"]}
                    speed={0.6}
                    scale={1.8}
                    turbulence={0.9}
                    fluidity={0.11}
                    rimWidth={0.22}
                    sharpness={2.5}
                    shimmer={1.5}
                    glow={2.4}
                    flowDirection="left"
                    opacity={1}
                    mouseInteraction
                    mouseStrength={1}
                    mouseRadius={0.35}
                />
            </div>



            <section className="flex items-center justify-center min-h-screen relative z-5">

                <div className="w-[40%] min-h-[50vh] relative shadow-xl rounded-[13px] text-white bg-[#c6cbf4]/20 backdrop-blur-[18px]" >
                    <form onSubmit={handlesubmit}>
                        <h1 className="text-center m-5 font-bold text-[30px]">Login</h1>
                        <div className="flex flex-col gap-2 m-4">
                            <label className="text-[20px]" htmlFor="">Email</label>
                            <input className="w-full border-2 border-[#e6e619] h-[37px] rounded-[8px] px-4" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                            <label className="text-[20px]" htmlFor="">password</label>
                            <input className="w-full border-2 border-[#e6e619] h-[37px] rounded-[8px] px-4" type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                        </div>
                        <div className="text-center p-10 flex items-center   w-full  justify-center gap-8 ">
                            <div onClick={() => setstatus("Employee")} className={`border-2 rounded-[15px] cursor-pointer w-40 p-6 ${status === "Employee" ? "border-[#add63c]" : "border-[#fafafa]"}`}>Employee</div>
                            <div onClick={() => setstatus("Admin")} className={`border-2 rounded-[15px] cursor-pointer w-40 p-6 ${status === "Admin" ? "border-[#add63c]" : "border-[#fafafa]"}`}>Admin</div>

                        </div>
                        <div className="text-center w-full">
                            {status === "Employee" && <p>Don't have an account <Link to={"/register"} className="cursor-pointer hover:text-[#1b33bf]">Register</Link></p>}
                        </div>

                        <div className="text-center w-full">
                            {error && (
                                <p style={{ color: "red" }}>
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between   inset-x-0 bottom-10 m-10">
                            <button className="p-4 rounded-[14px] text-[18px] bg-[#6a64ff] w-[30%] transition-all duration-300 ease-in-out hover:bg-[#46ace8]" type="button" onClick={() => navigate("/")}>Back</button>
                            <button className="p-4 rounded-[14px] text-[18px] bg-[#6a64ff] w-[30%] transition-all duration-300 ease-in-out hover:bg-[#46ace8]" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default Login