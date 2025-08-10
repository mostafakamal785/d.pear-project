import { Link } from "react-router-dom"

export default function CourseCard({ course }) {
  const isFree = course.price === 0

  return (
    <article className="card overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/courses/${course.slug}`} className="block">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="badge">{course.category}</span>
          {course.badge && (
            <span className="badge bg-yellow-100 text-yellow-800">{course.badge}</span>
          )}
        </div>

        <Link to={`/courses/${course.slug}`}>
          <h3 className="mt-3 font-semibold text-lg leading-snug line-clamp-2">{course.title}</h3>
        </Link>

        {course.description && (
          <p className="mt-2 text-slate-600 line-clamp-2">{course.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Link to={`/courses/${course.slug}`} className="btn-primary h-10 px-4 text-sm">
            {course.cta || "View Details"}
          </Link>
          <span
            className={`badge ${isFree ? "bg-green-100 text-green-700" : "bg-brand-100 text-brand-800"}`}
          >
            {isFree ? "Free" : `$${course.price}`}
          </span>
        </div>
      </div>
    </article>
  )
}
