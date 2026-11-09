import { useEffect, useState } from "react"
import Ferrofluid from "../assets/Ferrofluid"

const avatarStyles = [
    "bg-orange-500/15 text-orange-300",
    "bg-emerald-500/15 text-emerald-400",
    "bg-sky-500/15 text-sky-300",
    "bg-violet-500/15 text-violet-300",
    "bg-rose-500/15 text-rose-300",
]

const fmt = (n) =>
    Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })

// cost is stored per kg, quantity is in grams
const lineCost = (ing) => (ing.cost / 1000) * ing.quantity

function Products() {
    const [ingredients2, setingredients] = useState([]);
    const [Ingredients, setData] = useState([]);
    const [sellingprice, setselling] = useState("");
    const [productname, setproductname] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [quantities, setQuantities] = useState({});
    const [popup, setPopup] = useState(null); // null | "success" | "error"

    const products = {
        name: productname,
        selling_price: sellingprice,
        ingredients: Ingredients
    };

    const selectedItem = ingredients2.find(
        (i) => String(i.ingredient_id) === String(selectedId)
    );

    const totalCost = Ingredients.reduce(
        (sum, ing) => sum + lineCost(ing),
        0
    );

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
                if (data1.length > 0) setSelectedId(String(data1[0].ingredient_id));
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        }

        getingredients();
    }, []);

    const sendData = async (e) => {
        e.preventDefault();
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
            setPopup("success");
        } catch (error) {
            console.error("Error:", error);
            setPopup("error");
        }
    };

    const resetForm = () => {
        setproductname("");
        setselling("");
        setData([]);
        setQuantities({});
        if (ingredients2.length > 0) {
            setSelectedId(String(ingredients2[0].ingredient_id));
        }
    };

    const closePopup = () => {
        // only clear the form after a successful add
        if (popup === "success") resetForm();
        setPopup(null);
    };

    function changeQuantity(id, value) {
        setQuantities((previous) => ({
            ...previous,
            [id]: value
        }));
    }

    const addData = () => {
        if (!selectedItem) return;
        setData((prev) => [
            ...prev,
            {
                ...selectedItem,
                quantity: Math.max(
                    1,
                    Number(quantities[selectedItem.ingredient_id]) || 1
                )
            },
        ]);
    };

    const removeData = (index) => {
        setData((prev) => prev.filter((_, i) => i !== index));
    };

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20";
    const labelClass = "mb-2 block text-sm text-slate-400";
    const cardClass =
        "rounded-3xl border border-white/10 bg-[#11151d]/90 p-6 backdrop-blur-md";

    return (
        <>
            <div className="relative min-h-screen isolate">
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

                <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
                    {/* Header */}
                    <header className="mb-10">
                        <p className="mb-3 text-sm text-slate-400">
                            Products / <span className="text-emerald-400">New</span>
                        </p>
                        <h1 className="text-5xl font-bold tracking-tight text-slate-100">
                            Add a Product
                        </h1>
                        <p className="mt-3 text-slate-400">
                            Combine ingredients to work out what each product costs to make.
                        </p>
                    </header>

                    <form
                        onSubmit={sendData}
                        className="grid items-start gap-6 lg:grid-cols-[1fr_380px]"
                    >
                        {/* Left column */}
                        <div className="flex flex-col gap-6">
                            {/* Product details */}
                            <section className={cardClass}>
                                <h2 className="mb-5 text-lg font-semibold text-slate-100">
                                    Product details
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                                    <div>
                                        <label className={labelClass}>Product name</label>
                                        <input
                                            type="text"
                                            value={productname}
                                            onChange={(e) => setproductname(e.target.value)}
                                            placeholder="Product name"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Selling price</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={sellingprice}
                                                onChange={(e) => setselling(e.target.value)}
                                                placeholder="0.00"
                                                className={`${inputClass} pr-14`}
                                            />
                                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                                LKR
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Add ingredient */}
                            <section className={cardClass}>
                                <h2 className="mb-5 text-lg font-semibold text-slate-100">
                                    Add ingredient
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                                    <div>
                                        <label className={labelClass}>Ingredient</label>
                                        <select
                                            value={selectedId}
                                            onChange={(e) => setSelectedId(e.target.value)}
                                            className={`${inputClass} bg-[#1a1f2b]`}
                                        >
                                            {ingredients2.map((item) => (
                                                <option
                                                    key={item.ingredient_id}
                                                    value={item.ingredient_id}
                                                    className="bg-[#1a1f2b]"
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Cost per kg</label>
                                        <div className="flex h-[46px] items-center rounded-xl border border-dashed border-white/15 bg-black/30 px-4 text-sm">
                                            <span className="font-semibold text-white">
                                                {selectedItem ? fmt(selectedItem.cost) : "—"}
                                            </span>
                                            <span className="ml-1.5 text-xs text-slate-400">LKR</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1.6fr_1fr]">
                                    <div>
                                        <label className={labelClass}>Quantity (g)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantities[selectedId] ?? 1}
                                            onFocus={(e) => e.target.select()}
                                            onChange={(e) =>
                                                changeQuantity(selectedId, e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addData}
                                        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/70 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
                                    >
                                        <span className="text-lg leading-none">+</span>
                                        Add ingredient
                                    </button>
                                </div>
                            </section>

                            {/* Ingredients list */}
                            <section className={cardClass}>
                                <div className="mb-4 flex items-center gap-3">
                                    <h2 className="text-lg font-semibold text-slate-100">
                                        Ingredients
                                    </h2>
                                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                                        {Ingredients.length}
                                    </span>
                                </div>

                                {Ingredients.length === 0 ? (
                                    <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">
                                        No ingredients yet. Pick one above and add it.
                                    </p>
                                ) : (
                                    <div className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
                                        {Ingredients.map((ingred, index) => (
                                            <div
                                                key={`${ingred.ingredient_id}-${index}`}
                                                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                                            >
                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${avatarStyles[index % avatarStyles.length]}`}
                                                >
                                                    {ingred.name?.charAt(0).toUpperCase()}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-semibold text-slate-100">
                                                        {ingred.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {ingred.quantity} g
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xs text-slate-400">Total</p>
                                                    <p className="font-semibold text-slate-100">
                                                        {fmt(lineCost(ingred))}{" "}
                                                        <span className="text-xs font-normal text-slate-400">
                                                            LKR
                                                        </span>
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeData(index)}
                                                    aria-label={`Remove ${ingred.name}`}
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-red-400/50 hover:text-red-400"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right column: cost summary */}
                        <aside className={`${cardClass} lg:sticky lg:top-6`}>
                            <h2 className="mb-4 text-lg font-semibold text-slate-100">
                                Cost summary
                            </h2>

                            <div className="space-y-2 text-sm">
                                {Ingredients.map((ingred, index) => (
                                    <div
                                        key={`${ingred.ingredient_id}-${index}`}
                                        className="flex justify-between"
                                    >
                                        <span className="text-slate-400">{ingred.name}</span>
                                        <span className="text-slate-100">
                                            {fmt(lineCost(ingred))} LKR
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="my-4 border-t border-white/10" />

                            <p className="text-sm text-slate-400">Total cost</p>
                            <p className="mt-1 text-4xl font-bold text-emerald-400">
                                {fmt(totalCost)}{" "}
                                <span className="text-base font-semibold text-slate-400">LKR</span>
                            </p>

                            <div className="mt-5 flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3 text-sm">
                                <span className="text-slate-400">Selling price</span>
                                <span className="text-slate-100">
                                    {sellingprice ? `${fmt(sellingprice)} LKR` : "—"}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-3.5 font-semibold text-[#06140d] transition hover:bg-emerald-300"
                            >
                                Add Product
                            </button>
                        </aside>
                    </form>
                </main>

                {popup && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                        onClick={closePopup}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#11151d] p-8 text-center shadow-2xl"
                        >
                            <div
                                className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold ${popup === "success"
                                        ? "bg-emerald-500/15 text-emerald-400"
                                        : "bg-red-500/15 text-red-400"
                                    }`}
                            >
                                {popup === "success" ? "✓" : "!"}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100">
                                {popup === "success" ? "Product added" : "Couldn't add product"}
                            </h3>
                            <p className="mt-2 text-sm text-slate-400">
                                {popup === "success"
                                    ? "Your product was saved. The form will reset so you can add another."
                                    : "Something went wrong while saving. Your entries are still here, so you can try again."}
                            </p>
                            <button
                                type="button"
                                onClick={closePopup}
                                className={`mt-6 w-full rounded-xl px-4 py-3 font-semibold transition ${popup === "success"
                                        ? "bg-emerald-400 text-[#06140d] hover:bg-emerald-300"
                                        : "bg-white/10 text-slate-100 hover:bg-white/15"
                                    }`}
                            >
                                {popup === "success" ? "Done" : "Close"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Products
