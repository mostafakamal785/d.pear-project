import { Link } from "react-router-dom"
import { courses } from "../data/courses"

export default function Hero() {
  const featuredCourse = courses[0]

  return (
    <section className="hero-surface text-white">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
        
        <div className="space-y-6">
          {featuredCourse.badge && (
            <p className="uppercase tracking-widest font-semibold text-brand-200">
              {featuredCourse.badge}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {featuredCourse.title}
          </h1>
          <p className="text-white/85 max-w-md leading-relaxed">
            {featuredCourse.category} — Learn and grow your skills with this course.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to={`/courses/${featuredCourse.slug}`} className="btn-white h-11 px-6 shadow-md hover:shadow-lg">
              Browse Courses
            </Link>
            <Link to={`/courses/${featuredCourse.slug}`} className="btn-primary h-11 px-6 shadow-md hover:shadow-lg">
              {featuredCourse.cta || "Enroll Now"}
            </Link>
          </div>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <div className="bg-white text-slate-900 rounded-card p-4 w-[320px] sm:w-[380px] shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={featuredCourse.thumbnail}
              alt={featuredCourse.title}
              className="rounded-xl w-full h-52 object-cover"
            />
            <div className="font-semibold mt-4 text-lg">
              {featuredCourse.title}
            </div>
            <div className="text-sm text-slate-700">
              Price: {featuredCourse.price === 0 ? "Free" : `$${featuredCourse.price}`}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
