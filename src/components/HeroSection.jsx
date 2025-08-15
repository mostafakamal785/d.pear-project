import { Link } from "react-router-dom"
import { courses } from "../data/courses"

export default function HeroSection() {
  const featuredCourse = courses[0] || {}

  return (
    <section className="hero-surface text-white min-h-[80vh] flex items-center">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
        
        {/* النص */}
        <div className="space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-widest text-white/80 font-semibold">
            Featured Course
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {featuredCourse.title || "Course Title"}
          </h1>
          <p className="text-white/90 max-w-xl mx-auto lg:mx-0">
            {featuredCourse.description || "Master skills with hands-on projects, clear roadmaps, and expert guidance."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link to="/courses" className="btn-outline h-12 text-white border-white text-lg px-6">
              Browse Courses
            </Link>
            <Link to={`/courses/${featuredCourse.slug || ""}`} className="btn-primary h-12 text-lg px-6">
              Enroll Now
            </Link>
          </div>
        </div>

        {/* الصورة */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white text-slate-900 rounded-card p-4 sm:p-5 max-w-sm w-full shadow-lg">
            <img
              src={featuredCourse.thumbnail || "https://via.placeholder.com/600x400"}
              alt={featuredCourse.title || "Featured course"}
              className="rounded-xl w-full object-cover aspect-video"
            />
            <div className="font-semibold mt-3 text-lg">{featuredCourse.title || "Course Name"}</div>
            <div className="text-sm text-slate-700">{featuredCourse.category || "Category"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
