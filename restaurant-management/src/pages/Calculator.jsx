import Ferrofluid from "../assets/Ferrofluid"
function Calculator() {
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



                <main className="relative z-5">
                    <h2 className="text-white">Hello world</h2>
                </main>
            </div>
        </>
    )
}
export default Calculator