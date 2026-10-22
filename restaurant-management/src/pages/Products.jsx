import { useEffect, useState } from "react"
import Ferrofluid from "../assets/Ferrofluid"
function Products() {

    const [ingredients, setingredients] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getingredients() {
            const response = await fetch("http://localhost:5000/api/ingredients");
            const data = await response.json();
            setingredients(data);
        }
        getingredients();
    }, []);

    const sendData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/ingredients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }

            const result = await response.json();
            console.log("Backend response:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const addData = (item) => {
        setData((prev) => [...prev, item]);
    };

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
                                <form className="m-5" onSubmit={sendData}>
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
                                            <div
                                                key={item.id}
                                                className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Price: LKR {item.price}
                                                </p>

                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Quantity</span>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        defaultValue={1}
                                                        className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => addData(item)}
                                                    type="button"
                                                    className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                                >
                                                    Add to Data
                                                </button>
                                            </div>
                                        ))}


                                    </div>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-green-600 px-4 py-2 text-white"
                                    >
                                        Submit Ingredients
                                    </button>


                                </form>
                            </div>
                            <div className="w-[50%] rounded-[16px] m-2 bg-[#e6d5f2]/40 h-[94%]">

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Products