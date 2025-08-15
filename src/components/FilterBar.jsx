export default function FilterBar({ value, onChange, categories }) {
  const filterButtonClass = (isActive) =>
    `h-10 px-4 rounded-pill text-sm border transition-colors ${
      isActive ? "bg-ink-900 text-white border-ink-900" : "border-ink-300 hover:bg-ink-100"
    }`

  return (
    <div className="card p-4 sm:p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex gap-2">
        <button onClick={() => onChange({ ...value, price: "all" })} className={filterButtonClass(value.price === "all")}>
          All
        </button>
        <button onClick={() => onChange({ ...value, price: "free" })} className={filterButtonClass(value.price === "free")}>
          Free
        </button>
        <button onClick={() => onChange({ ...value, price: "paid" })} className={filterButtonClass(value.price === "paid")}>
          Paid
        </button>
      </div>

      <div className="flex gap-3 items-center">
        <input
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search courses..."
          className="h-10 rounded-pill px-4 border border-ink-300 w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
        <select
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
          className="h-10 rounded-pill px-4 border border-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-600"
        >
          {["All", ...categories].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
