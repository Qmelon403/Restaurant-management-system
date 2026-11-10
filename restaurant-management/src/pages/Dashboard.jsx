import { useState } from "react";
import Ferrofluid from "../assets/Ferrofluid";
import "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";

/* ---------- temporary hard-coded data ---------- */

const ranges = ["Today", "7D", "30D", "12M"];

const kpis = [
    { label: "Revenue", value: "1,284,500", unit: "LKR", change: "12.4%", up: true, good: true },
    { label: "Total expenses", value: "862,300", unit: "LKR", change: "5.1%", up: true, good: false },
    { label: "Net profit", value: "422,200", unit: "LKR", change: "24.8%", up: true, good: true, accent: true },
    { label: "Orders", value: "1,846", unit: "", change: "8.2%", up: true, good: true },
];

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const revenueData = [132000, 148000, 141000, 165000, 158000, 172000, 181000, 187500];
const expenseData = [92000, 98000, 101000, 104000, 106000, 112000, 118000, 131300];

const expenseBreakdown = [
    { label: "Ingredients", pct: 52, color: "#34d399" },
    { label: "Staff", pct: 24, color: "#38bdf8" },
    { label: "Rent", pct: 11, color: "#a78bfa" },
    { label: "Utilities", pct: 9, color: "#fb923c" },
    { label: "Other", pct: 4, color: "#64748b" },
];

const topProducts = [
    { name: "Chicken Kottu", orders: 366, cost: 780, price: 1450, margin: 46.2 },
    { name: "Fried Rice", orders: 412, cost: 640, price: 1100, margin: 41.8 },
    { name: "Garden Veg Soup", orders: 298, cost: 320, price: 650, margin: 50.8 },
    { name: "Seafood Pasta", orders: 241, cost: 980, price: 1800, margin: 45.6 },
];

const recentOrders = [
    { id: 1846, where: "Table 4", amount: 4250, status: "Served" },
    { id: 1845, where: "Takeaway", amount: 2900, status: "Preparing" },
    { id: 1844, where: "Table 7", amount: 6100, status: "Preparing" },
    { id: 1843, where: "Table 2", amount: 1850, status: "Served" },
];

const fmt = (n) => Number(n || 0).toLocaleString("en-US");

/* ---------- chart configs ---------- */

const axisColor = "#94a3b8";
const gridColor = "rgba(255,255,255,0.06)";

const lineData = {
    labels: weeks,
    datasets: [
        {
            label: "Revenue",
            data: revenueData,
            borderColor: "#34d399",
            backgroundColor: "rgba(52, 211, 153, 0.12)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
        },
        {
            label: "Expenses",
            data: expenseData,
            borderColor: "#a78bfa",
            backgroundColor: "rgba(167, 139, 250, 0.10)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
        },
    ],
};

const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${fmt(ctx.parsed.y)} LKR`,
            },
        },
    },
    scales: {
        x: {
            ticks: { color: axisColor },
            grid: { display: false },
            border: { display: false },
        },
        y: {
            min: 0,
            max: 200000,
            ticks: {
                color: axisColor,
                stepSize: 50000,
                callback: (v) => (v === 0 ? "0" : `${v / 1000}k`),
            },
            grid: { color: gridColor },
            border: { display: false },
        },
    },
};

const doughnutData = {
    labels: expenseBreakdown.map((e) => e.label),
    datasets: [
        {
            data: expenseBreakdown.map((e) => e.pct),
            backgroundColor: expenseBreakdown.map((e) => e.color),
            borderWidth: 0,
            cutout: "72%",
        },
    ],
};

const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` },
        },
    },
};

/* ---------- component ---------- */

function Dashboard() {
    const [range, setRange] = useState("30D");

    const cardClass =
        "rounded-3xl border border-white/10 bg-[#11151d]/90 p-6 backdrop-blur-md";

    return (
        <div className="relative min-h-screen isolate overflow-hidden">


            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">

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



            <main className="relative z-10 min-h-screen">
                {/* Content */}
                <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
                    {/* Header */}
                    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-100">
                                Dashboard
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Revenue, costs and orders at a glance.
                            </p>
                        </div>

                        <div className="flex rounded-xl border border-white/10 bg-[#11151d]/90 p-1 backdrop-blur-md">
                            {ranges.map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRange(r)}
                                    className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${range === r
                                            ? "bg-emerald-400 text-[#06140d]"
                                            : "text-slate-400 hover:text-slate-100"
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* KPI cards */}
                    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((k) => (
                            <div key={k.label} className={cardClass}>
                                <p className="text-sm text-slate-400">{k.label}</p>
                                <p
                                    className={`mt-2 text-3xl font-bold ${k.accent ? "text-emerald-400" : "text-slate-100"
                                        }`}
                                >
                                    {k.value}
                                    {k.unit && (
                                        <span className="ml-1.5 text-sm font-semibold text-slate-400">
                                            {k.unit}
                                        </span>
                                    )}
                                </p>
                                <p className="mt-3 text-xs text-slate-400">
                                    <span
                                        className={`mr-1 font-semibold ${k.good ? "text-emerald-400" : "text-rose-400"
                                            }`}
                                    >
                                        {k.up ? "▲" : "▼"} {k.change}
                                    </span>
                                    vs previous period
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Charts row */}
                    <section className="mb-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
                        <div className={cardClass}>
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <h2 className="text-lg font-semibold text-slate-100">
                                    Revenue vs expenses
                                </h2>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        Revenue
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                                        Expenses
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[320px] w-full min-w-0">
                                <Line data={lineData} options={lineOptions} />
                            </div>
                        </div>

                        <div className={cardClass}>
                            <h2 className="mb-5 text-lg font-semibold text-slate-100">
                                Expense breakdown
                            </h2>

                            <div className="relative mx-auto h-[200px] w-[200px]">
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-slate-100">862,300</p>
                                    <p className="text-xs text-slate-400">LKR total</p>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-2.5 text-sm">
                                {expenseBreakdown.map((e) => (
                                    <li key={e.label} className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-slate-300">
                                            <span
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{ backgroundColor: e.color }}
                                            />
                                            {e.label}
                                        </span>
                                        <span className="font-semibold text-slate-100">{e.pct}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Table + recent orders */}
                    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                        <div className={cardClass}>
                            <h2 className="mb-5 text-lg font-semibold text-slate-100">
                                Top products by margin
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[520px] text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                                            <th className="pb-3 font-medium">Product</th>
                                            <th className="pb-3 text-right font-medium">Orders</th>
                                            <th className="pb-3 text-right font-medium">Cost</th>
                                            <th className="pb-3 text-right font-medium">Price</th>
                                            <th className="pb-3 text-right font-medium">Margin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topProducts.map((p) => (
                                            <tr
                                                key={p.name}
                                                className="border-b border-white/5 last:border-0"
                                            >
                                                <td className="py-3.5 font-semibold text-slate-100">
                                                    {p.name}
                                                </td>
                                                <td className="py-3.5 text-right text-slate-300">
                                                    {fmt(p.orders)}
                                                </td>
                                                <td className="py-3.5 text-right text-slate-300">
                                                    {fmt(p.cost)}
                                                </td>
                                                <td className="py-3.5 text-right text-slate-300">
                                                    {fmt(p.price)}
                                                </td>
                                                <td className="py-3.5 text-right">
                                                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                                                        {p.margin.toFixed(1)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={cardClass}>
                            <h2 className="mb-5 text-lg font-semibold text-slate-100">
                                Recent orders
                            </h2>
                            <div className="space-y-2">
                                {recentOrders.map((o) => (
                                    <div
                                        key={o.id}
                                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-100">
                                                Order #{o.id}
                                            </p>
                                            <p className="text-xs text-slate-400">{o.where}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-slate-100">
                                                {fmt(o.amount)}{" "}
                                                <span className="text-xs font-normal text-slate-400">
                                                    LKR
                                                </span>
                                            </p>
                                            <span
                                                className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${o.status === "Served"
                                                        ? "bg-emerald-500/15 text-emerald-400"
                                                        : "bg-amber-500/15 text-amber-300"
                                                    }`}
                                            >
                                                {o.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </div>
    );
}

export default Dashboard;
