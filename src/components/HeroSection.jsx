import { Link } from "react-router-dom"

export default function HeroSection({ featuredCourse }) {
  return (
    <section className="hero-surface text-white">
      <div className="container-x grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-20">
        <div className="space-y-6">
          <p className="uppercase tracking-widest text-white/80 font-semibold">
            {featuredCourse?.badge || "Our latest course"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {featuredCourse?.title || "Course Title"}
          </h1>
          <p className="text-white/90">
            {featuredCourse?.description ||
              "Master skills with hands-on projects, clear roadmaps, and expert guidance."}
          </p>
          <div className="flex gap-3">
            <Link to="/courses" className="btn-outline h-11 text-white border-white">
              Browse Courses
            </Link>
            <Link to={`/courses/${featuredCourse?.slug || ""}`} className="btn-primary h-11">
              {featuredCourse?.cta || "Enroll Now"}
            </Link>
          </div>
        </div>

        <div className="justify-self-end">
          <div className="bg-white text-slate-900 rounded-card p-3 sm:p-4 w-[320px] sm:w-[380px] shadow-soft">
            <img
              src={featuredCourse?.thumbnail || "/placeholder.svg"}
              alt={featuredCourse?.title || "Featured course"}
              className="rounded-xl w-full h-52 object-cover"
            />
            <div className="font-semibold mt-3 text-lg">{featuredCourse?.title || "Course Name"}</div>
            <div className="text-sm text-slate-700">{featuredCourse?.category || "Category"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
