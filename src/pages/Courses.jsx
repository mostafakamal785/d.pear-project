import React, { useMemo, useState } from "react"
import CourseCard from "../components/CourseCard"
import { courses as allCourses } from "../data/courses"

export default function Courses() {
  const [filters, setFilters] = useState({ price: "all", category: "All", q: "" })

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allCourses.map((c) => c.category)))],
    []
  )

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const priceOk = filters.price === "all" || (filters.price === "free" ? c.price === 0 : c.price > 0)
      const catOk = filters.category === "All" || c.category === filters.category
      const q = filters.q.trim().toLowerCase()
      const searchableText = `${(c.title || "").toLowerCase()} ${(c.description || "").toLowerCase()}`
      const qOk = !q || searchableText.includes(q)
      return priceOk && catOk && qOk
    })
  }, [filters])

  return (
    <section className="container-x py-12 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="text-brand-700 font-semibold mb-2">Browse</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold">All Courses</h1>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Price Filter */}
        <div className="flex gap-2">
          {["all", "free", "paid"].map((type) => (
            <button
              key={type}
              onClick={() => setFilters((f) => ({ ...f, price: type }))}
              className={
                "h-10 px-4 rounded-pill text-sm border " +
                (filters.price === type
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-300 hover:bg-slate-100")
              }
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Search & Category */}
        <div className="flex gap-3 items-center">
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search courses..."
            className="h-10 rounded-pill px-4 border border-slate-300 w-48 sm:w-64"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="h-10 rounded-pill px-4 border border-slate-300"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((c) => <CourseCard key={c.id} course={c} />)
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </section>
  )
}
