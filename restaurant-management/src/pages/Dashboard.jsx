import Ferrofluid from "../assets/Ferrofluid";
import "chart.js/auto";
import { Bar, Line, Doughnut } from "react-chartjs-2";

function Dashboard() {
    const data = {
        labels: ["January", "February", "March"],

        datasets: [
            {
                label: "Sales",
                data: [120, 300, 239],
                backgroundColor: "#2a0c37",
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                labels: {
                    color: "#ffffff",
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    color: "#3a2440",
                },
            },

            y: {
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    color: "#362857",
                },
            },
        },
    };
    const linedata = {
        labels: ["January", "February", "March", "April", "May"],

        datasets: [
            {
                label: "Sales",
                data: [120, 300, 239, 450, 380],

                borderColor: "#3aa4d4",
                backgroundColor: "rgba(140, 130, 13, 0.2)",

                borderWidth: 3,

                tension: 0.4,

                fill: true,

                pointBackgroundColor: "#5d38d7",
                pointBorderColor: "#ffffff",
                pointRadius: 5,
            },
        ],
    };
    const lineoptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                labels: {
                    color: "#ffffff",
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "#ffffff",
                },

                grid: {
                    color: "#3a2440",
                },
            },

            y: {
                ticks: {
                    color: "#ffffff",
                },

                grid: {
                    color: "#362857",
                },
            },
        },
    };
    const doghnutdata = {
        labels: ["jan", "feb", "may"],
        datasets: [
            {
                label: "sales",
                data: [200, 300, 100],
                backgroundColor: [
                    "#c896a1",
                    "#c6f079",
                    "#a987d2",

                ],
                borderWidth: 0,
                cutout: "60%",

            },
        ],
    }
    const doghnutproperties = {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 360,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    display: true,
                    color: "#ffffff",
                },
            },
        },

    }

    return (
        <div className="relative min-h-full isolate">

            {/* =========================
                FERROFLUID BACKGROUND
            ========================== */}
            <div className="absolute inset-0 z-0 bg-slate-950">

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



            <main className="relative z-0 ">
                <div className="w-full h-[30vh] justify-between flex place-content-center items-center  ">
                    <div className=" w-1/4 rounded-[18px] border-3 border-[#bce082] gap-2 m-3 ">
                        <h1 className="font-mono font-bold  text-center text-white text-[28px] p-3">Profit</h1>
                        <h1 className="font-mono font-bold  text-center text-white text-[40px] ">123445</h1>

                    </div>
                    <div className=" w-1/4 rounded-[18px] border-3 border-[#bce082] gap-2  ">
                        <h1 className="font-mono font-bold  text-center text-white text-[28px] p-3">Loss</h1>
                        <h1 className="font-mono font-bold  text-center text-white text-[40px] ">1233445</h1>
                    </div>
                    <div className=" w-1/4 rounded-[18px] border-3 border-[#bce082] gap-2 m-3">
                        <h1 className="font-mono font-bold  text-center text-white text-[28px] p-3">Total Sales</h1>
                        <h1 className="font-mono font-bold  text-center text-white text-[40px] ">123445</h1>
                    </div>


                </div>

                <div className="w-full px-4 md:px-8 bg-[#120517]/40 flex flex-col md:flex-row gap-8 justify-center">

                    {/* Doughnut */}
                    <div className="w-full md:w-1/2 max-w-3xl min-w-0 bg-gradient-to-b from-[#2a0c37]/40 to-[#5d38d7]/40 rounded-2xl p-6">

                        <h2 className="text-white text-2xl font-bold mb-6">
                            Monthly Sales
                        </h2>

                        <div className="relative w-full h-[400px]">
                            <Doughnut
                                data={doghnutdata}
                                options={doghnutproperties}
                            />
                        </div>

                    </div>


                    {/* Bar */}
                    <div className="w-full md:w-1/2 max-w-3xl min-w-0 bg-gradient-to-b from-[#2a0c37]/40 to-[#5d38d7]/40 rounded-2xl p-6">

                        <h2 className="text-white text-2xl font-bold mb-6">
                            Monthly Sales
                        </h2>

                        <div className="relative w-full h-[400px]">
                            <Bar
                                data={data}
                                options={options}
                            />
                        </div>

                    </div>

                </div>
                <div className="w-full text-white h-[50vh]  flex justify-center gap-2 ">

                    <div className="bg-[#120517]/40 w-[100%] rounded-[18px] p-3 flex justify-center">

                        <div className="w-full md:w-[80%]   bg-gradient-to-r from-[#2a0c37]/40 to-[#5d38d7]/40 rounded-2xl h-full p-8">

                            <h2 className="text-white text-2xl font-bold mb-6">
                                Monthly Sales
                            </h2>

                            <div className="relative w-full h-[350px]">

                                <Line
                                    data={linedata}
                                    options={lineoptions}
                                />
                            </div>

                        </div>

                    </div>

                </div>


            </main>

        </div>
    );
}

export default Dashboard;