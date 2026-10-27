import { useEffect, useState } from "react"
import Ferrofluid from "../assets/Ferrofluid"
function Products() {

    const [ingredients2, setingredients] = useState([]);
    const [Ingredients, setData] = useState([]);
    const [sellingprice, setselling] = ("");
    const [productname, setproductname] = ("");



    const products = {
        name: productname,
        selling_price: sellingprice,
        ingredients: Ingredients
    };

    useEffect(() => {
        async function getingredients() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/select"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data1 = await response.json();
                setingredients(data1);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        }

        getingredients();
    }, []);

    const sendData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/insertproducts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(products),
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
                                <form
                                    className="m-5 flex min-h-0 flex-1 flex-col"
                                    onSubmit={sendData}
                                >

                                    <div className="flex flex-col gap-3 shrink-0">
                                        <label className="mt-4 mb-2 block text-lg font-bold tracking-wide text-white/90">
                                            Product Name
                                        </label>

                                        <input
                                            onChange={(e) => setproductname(e.target.value)}
                                            type="text"
                                            placeholder="Enter product name"
                                            className="mt-2 w-full rounded-md border border-white/30 bg-white/20 p-3 text-white backdrop-blur-md placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <label className="mt-4 mb-2 block text-lg font-bold tracking-wide text-white/90">
                                            Selling Price
                                        </label>

                                        <input
                                            onChange={(e) => setselling(e.target.value)}
                                            type="number"
                                            placeholder="Enter selling price"
                                            className="mt-2 w-full rounded-md border border-white/30 bg-white/20 p-3 text-white backdrop-blur-md placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>


                                    <label className="mt-4 mb-2 block shrink-0 text-lg font-bold tracking-wide text-white/90">
                                        Ingredients
                                    </label>


                                    <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden p-2">
                                        {ingredients2.map((ingred) => (
                                            <div
                                                key={ingred.id}
                                                className="box-border w-full rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-sm"
                                            >
                                                <h1 className="font-semibold">{ingred.name}</h1>
                                                <p>LKR: {ingred.cost}</p>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="shrink-0 border-t border-white/20 bg-transparent pt-3">
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                                        >
                                            Submit Ingredients
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-[50%] rounded-[16px] m-2 p-3 bg-[#e6d5f2]/40 h-[94%] flex justify-center">
                                <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                                    {ingredients2.map((item) => (
                                        <div
                                            key={item.id}
                                            className="w-full rounded-xl border border-gray-200 bg-white p-2  shadow-sm"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Price: LKR {item.cost}
                                            </p>

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Quantity</span>


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
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Products