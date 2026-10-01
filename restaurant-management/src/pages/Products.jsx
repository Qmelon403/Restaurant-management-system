import Ferrofluid from "../assets/Ferrofluid"
function Products() {

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
                                <form action="">

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