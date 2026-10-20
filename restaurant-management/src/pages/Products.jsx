import { useEffect, useState } from "react"
import Ferrofluid from "../assets/Ferrofluid"
function Products() {

    const [ingredients, setingredients] = useState([]);

    useEffect(() => {
        async function getingredients() {
            const response = await fetch("http://localhost:5000/api/ingredients");
            const data = await response.json();
            setingredients(data);
        }
        getingredients();
    }, []);

    function submit() {

    }

    return (
        <>

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



                <main className="relative p-2 z-5">
                    <div className="m-1    h-screen">
                        <div className="m-1  h-[15%] rounded-[30px] bg-gradient-to-r from-[#88b6d1]/70 to-[#888ad1]/70 flex justify-center  items-center">
                            <h1 className="text-[#03041a] text-center text-[30px] font-[700] md:text-[70px]">Add a Product</h1>
                        </div>
                        <div className="m-2 p-1 h-[85%] flex justify-center items-center">
                            <div className="w-[50%] rounded-[16px] m-2 bg-[#e6d5f2]/40 h-[94%]">
                                <form className="m-5" onSubmit={submit}>
                                    <div className="flex flex-col gap-5">
                                        <label className="block mt-4 mb-2 text-lg font-bold
                  text-white/90 tracking-wide">Product Name</label>
                                        <input type="text" placeholder="Enter product name" className="w-full mt-2 p-3
             bg-white/20 backdrop-blur-md
             border border-white/30
             rounded-md text-white
             placeholder-white/60
             focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                        <label className="block mt-4 mb-2 text-lg font-bold
                  text-white/90 tracking-wide">Selling Price</label>
                                        <input type="text" placeholder="Enter Selling price" className="w-full mt-2 p-3
             bg-white/20 backdrop-blur-md
             border border-white/30
             rounded-md text-white
             placeholder-white/60
             focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    </div>
                                    <label className="mt-4 block mb-2 text-lg font-bold
                  text-white/90 tracking-wide">Ingredients</label>
                                    <div>
                                        {ingredients.map((item) => (
                                            <p key={item.id}>{item.name}</p>
                                        ))}
                                    </div>


                                </form>
                            </div>
                            <div className="w-[50%] rounded-[16px] m-2 bg-[#e6d5f2]/40 h-[94%]">

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default Products