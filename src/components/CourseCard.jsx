import { Link } from "react-router-dom"

export default function CourseCard({ course }) {
  if (!course) return null

  return (
    <div className="card overflow-hidden flex flex-col">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-slate-600 text-sm flex-1">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-brand-600 font-bold">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="btn-primary h-9 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
